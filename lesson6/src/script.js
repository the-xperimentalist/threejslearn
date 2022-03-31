import './style.css'
import * as THREE from 'three'

// Importing only for 3rd method of animation
import gsap from 'gsap'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const axesHelper =new THREE.AxesHelper()
scene.add(axesHelper)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(new THREE.Vector3(mesh.position))

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)

// Method 1: Render scene with moving time values
// let time = Date.now()
// const tick = () => {

//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//     console.log(deltaTime)

//     // Update objects
//     mesh.rotation.y +=0.001 * deltaTime

//     // Renderer
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }

// Method 2: Using three clock
// const clock = new THREE.Clock()
// const tick = () => {

//     const elapsedTime = clock.getElapsedTime()
//     console.log(elapsedTime)

//     // Update objects via the elapsed time
//     mesh.rotation.y = elapsedTime * Math.PI

//     // Test movement
//     camera.position.y = Math.sin(elapsedTime)
//     camera.position.x = Math.cos(elapsedTime)
//     camera.lookAt(mesh.position)

//     // Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }

// Method 3: Using gsap for complex timelines etc

gsap.to(mesh.position, { x: 2, duration: 1, delay: 1})
gsap.to(mesh.position, { x: -1, duration: 1, delay: 1})
const tick = () => {

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}


tick()
