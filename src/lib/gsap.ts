import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, useGSAP)

const EASE_OUT = CustomEase.create('caprine-out', '0.16, 1, 0.3, 1')

export { gsap, ScrollTrigger, SplitText, useGSAP, EASE_OUT }
