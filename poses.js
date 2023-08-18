import { GestureDescription, Finger, FingerCurl } from 'fingerpose'

// Rock Gesture
export const rockGesture = new GestureDescription('rock')
rockGesture.addCurl(Finger.Index, FingerCurl.FullCurl)
rockGesture.addCurl(Finger.Middle, FingerCurl.FullCurl)
rockGesture.addCurl(Finger.Ring, FingerCurl.FullCurl)
rockGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl)
rockGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl)
rockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl)
rockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl)

// Paper Gesture
export const paperGesture = new GestureDescription('paper')
paperGesture.addCurl(Finger.Index, FingerCurl.NoCurl)
paperGesture.addCurl(Finger.Middle, FingerCurl.NoCurl)
paperGesture.addCurl(Finger.Ring, FingerCurl.NoCurl)
paperGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl)
paperGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl)

// Scissors Gesture
export const scissorsGesture = new GestureDescription('scissors')
scissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl)
scissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl)
scissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl)
scissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl)
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl)
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl)
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl)