// Imports and DOM
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import * as fp from 'fingerpose'
import { rockGesture, paperGesture, scissorsGesture } from './poses'
const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
const gestureText = document.getElementById('gesture-text')
const loadingStatus = document.getElementById('loading-status')
const autoButton = document.getElementById('auto-button')
const manualButton = document.getElementById('manual-button')
const mode = document.getElementById('mode')
const tutorialOpenBtn = document.getElementById('open-how-to-play')
const tutorialCloseBtn = document.getElementById('close-how-to-play')
const tutorial = document.getElementById('how-to-play')
const playerChoiceText = document.getElementById('player-choice')
const computerChoiceText = document.getElementById('computer-choice')
const resultDiv = document.getElementById('result-div')
const resultElement = document.getElementById('result')
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')
const computerChoices = ['rock', 'paper', 'scissors']
let auto = false
let gameLoop

function playerWins() {
    resultElement.innerText = 'You Win!'
    resultDiv.style.backgroundColor = 'green'
    playerScore.innerText++
}

function computerWins() {
    resultElement.innerText = 'Computer Wins!'
    resultDiv.style.backgroundColor = 'red'
    computerScore.innerText++
}

function draw() {
    resultElement.innerText = 'Draw!'
    resultDiv.style.backgroundColor = '#cc9900'
}

function outCome(playerChoice, computerChoice) {
    switch(playerChoice) {
        case 'rock':
            switch(computerChoice) {
                case 'rock': 
                    draw()
                    break
                case 'paper': 
                    computerWins()
                    break
                case 'scissors': 
                    playerWins()
                    break
            }
            break
        case 'paper':
            switch(computerChoice) {
                case 'rock': 
                    playerWins()
                    break
                case 'paper': 
                    draw()
                    break
                case 'scissors': 
                    computerWins()
                    break
            }
            break

        case 'scissors':
            switch(computerChoice) {
                case 'rock': 
                    computerWins()
                    break
                case 'paper': 
                    playerWins()
                    break
                case 'scissors': 
                    draw()
                    break
            }
    }
}

// open/close tutoria
tutorialOpenBtn.onclick = ()=> {
    tutorial.style.display = 'grid'
}

tutorialCloseBtn.onclick = ()=> {
    tutorial.style.display = 'none'
}

// Set video stream to webcam
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(steam => {
        video.srcObject = steam
    }).catch(error => {
        console.log('not working')
    })
}

// Main function for entire app
async function handPoseInit() {
    const net = await handpose.load()
    console.log('Model loaded')
    setInterval(() => {
        detectHand(net)
    }, 100);
}

// hand detection
async function detectHand(net) {
    if (video.readyState === 4) {
        loadingStatus.innerText = 'Ready'
        loadingStatus.style.animation = 'none'
        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight
        canvas.width = videoWidth
        canvas.height = videoHeight
        const hand = await net.estimateHands(video)
        // console.log(hand)
        drawhand(hand, canvas.getContext('2d'))
        if (hand.length > 0) {
            const GE = new fp.GestureEstimator([rockGesture, paperGesture, scissorsGesture])
            const gestureEstimate = await GE.estimate(hand[0].landmarks, 8)
            console.log(gestureEstimate.gestures[0].name)
            gestureText.innerText = gestureEstimate.gestures[0].name
        }

        autoButton.onclick = ()=> {
            mode.innerText = 'Automatic'
            async function game() {
                let computerChoice = computerChoices[Math.floor(Math.random()*3)]
                if (hand.length > 0) {
                    const GE = new fp.GestureEstimator([rockGesture, paperGesture, scissorsGesture])
                    const gestureEstimate = await GE.estimate(hand[0].landmarks, 8)
                    const playerChoice = gestureEstimate.gestures[0].name
            
                    console.log('You choose: ' + playerChoice)
                    playerChoiceText.innerText = playerChoice
            
                    computerChoiceText.innerText = computerChoice
                    console.log('comp choice: ' + computerChoice)
            
                    outCome(playerChoice, computerChoice)
                }
            }
            auto = !auto 
            console.log(auto)
            if (auto === true) {
               clearInterval(gameLoop)
               gameLoop = setInterval(game, 500)
               console.log('loop started')
            } else {
                clearInterval(gameLoop)
                console.log(gameLoop)
                console.log('loop cleared')
                mode.innerText = 'None'
            }
        }

        manualButton.onclick = async()=> {
            clearInterval(gameLoop)
            mode.innerText = 'Click to play'
            let computerChoice = computerChoices[Math.floor(Math.random()*3)]
            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([rockGesture, paperGesture, scissorsGesture])
                const gestureEstimate = await GE.estimate(hand[0].landmarks, 8)
                const playerChoice = gestureEstimate.gestures[0].name
        
                console.log('You choose: ' + playerChoice)
                playerChoiceText.innerText = playerChoice
        
                computerChoiceText.innerText = computerChoice
                console.log('comp choice: ' + computerChoice)
              
                outCome(playerChoice, computerChoice)
            }
        }
    }
}

// Drawing the hand overlay
function drawhand(predictions, ctx) {
    console.log(predictions)
    if (predictions.length > 0) {
        predictions.forEach(prediction => {
            const landmarks = prediction.landmarks
            for (let i = 0; i < landmarks.length; i++) {
                const x = landmarks[i][0]
                const y = landmarks[i][1]
                ctx.beginPath()
                ctx.arc(x, y, 5, 0, (2*Math.PI))
                ctx.fillStyle = 'blue'
                ctx.fill()             
            }
        });
    }
}

// Calling the main function
handPoseInit()