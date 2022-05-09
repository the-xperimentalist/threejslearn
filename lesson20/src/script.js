import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()
// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = -(event.clientY / sizes.height * 2 - 1)
})

window.addEventListener('click', (event) => {
    console.log("click")
    // // Clicks can be tracked
    // if (currentIntersect) {
    //     console.log("clicked on sphere")
    // }

    if (currentIntersect.object === object1) {
        console.log("clicked on 1")
    }
    if (currentIntersect.object === object2) {
        console.log("clicked on 2")
    }
    if (currentIntersect.object === object3) {
        console.log("clicked on 3")
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

// Witness var
let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate
    object1.position.y = Math.sin(elapsedTime * 0.4) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.2) * 1.8

    // Random light passiing test
    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(10, 0, 0)
    // rayDirection.normalize()
    // raycaster.set(rayOrigin, rayDirection)

    // const objsToTest = [object1, object2, object3]
    // const intersects = raycaster.intersectObjects(objsToTest)

    // for(const obj of objsToTest) {
    //     obj.material.color.set('#000ff0')
    // }

    // for(const intersect of intersects) {
    //     intersect.object.material.color.set('#00ff00')
    // }

    // Cast a ray using mouse
    // raycaster.setFromCamera(mouse, camera)

    // const objsToTest = [object1, object2, object3]
    // const intersects = raycaster.intersectObjects(objsToTest)

    // for(const obj of objsToTest) {
    //     obj.material.color.set('#000ff0')
    // }

    // for(const intersect of intersects) {
    //     intersect.object.material.color.set('#00ff00')
    // }

    // Cast a ray using mouse
    raycaster.setFromCamera(mouse, camera)

    const objsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objsToTest)

    for(const obj of objsToTest) {
        obj.material.color.set('#000ff0')
    }

    for(const intersect of intersects) {
        intersect.object.material.color.set('#00ff00')
    }

    if(intersects.length) {
        if (currentIntersect === null) {
            // mouse enter event
            console.log("mouse enter")
        }
        console.log("Something hovered")
        currentIntersect = intersects[0]
    } else {
        if (currentIntersect !== null ) {
            // mouse exit event
            console.log("mouse exit")
        }
        console.log("Nothing hovered")
        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()