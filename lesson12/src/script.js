import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/*
 *
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*
 ** Texture
 */
const loadingManager = new THREE.LoadingManager()
// const textureLoader = new THREE.TextureLoader(loadingManager)
// const textureAlphaDoor = textureLoader.load(
//     "/textures/door/alpha.jpg")
// const textureAmbientOcculsionDoor = textureLoader.load(
//     "/textures/door/ambientOcclusion.jpg")
// const textureColorDoor = textureLoader.load(
//     "/textures/door/color.jpg")
// const textureHeightDoor = textureLoader.load(
//     "/textures/door/height.jpg")
// const textureMetalDoor = textureLoader.load(
//     "/textures/door/metalness.jpg")
// const textureNormalDoor = textureLoader.load(
//     "/textures/door/normal.jpg")
// const textureRoughnessDoor = textureLoader.load(
//     "/textures/door/roughness.jpg")
// const matcaptexture = textureLoader.load(
//     "/textures/matcaps/1.png")
// const gradientTexture = textureLoader.load(
//     "/textures/gradients/3.jpg")
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.maxFilter = THREE.NearestFilter

// Trying out cube texture loader
const textureLoader = new THREE.CubeTextureLoader()
const environmenMapTexture = textureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'])

/*
 ** Objects
 */
// MeshBasicMaterial is the most basic material available in threejs
// const material = new THREE.MeshBasicMaterial({ map: textureAlphaDoor })
// The following also works
// const material = new THREE.MeshBasicMaterial()
// material.map = textureAlphaDoor
// material.color = new THREE.Color(0xff0000)
// material.color = new THREE.Color('rgb(255,0,0)')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.side = THREE.BackSide
// material.side = THREE.FrontSide

// Trying out the normal material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// Trying out the mesh matcap material
// This simulates light in the scene as falling from the camera
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcaptexture

// Trying out the mesh depth material
// The material is to assign color based upon the near vs far from the camera effect
// const material = new THREE.MeshDepthMaterial()

// Trying out the mesh lambert material
// The material is the only one that responds to light
// const material = new THREE.MeshLambertMaterial()

// Trying out the mesh phong material
// More graphics intensive
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xffff00)

// Trying out the mesh toon material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// Trying out mesh standard material
// The best algo and most used for handling lights
const material = new THREE.MeshStandardMaterial()
material.envMap = environmenMapTexture
// material.roughness = 0.45
// material.metalness = 0.5
// material.map =  textureColorDoor
// material.aoMap = textureAmbientOcculsionDoor
// material.aoMapIntensity = 1
// material.displacementMap = textureHeightDoor
// material.displacementScale = 0.05
// material.metalnessMap = textureMetalDoor
// material.roughnessMap = textureRoughnessDoor
// material.normalMap = textureNormalDoor
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = textureAlphaDoor

// gui.add(material, 'roughness').min(0).max(1).step(0.001)
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.01)
// gui.add(material, 'displacementScale').min(0).max(10).step(0.01)

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material)
sphere.position.x = -1.5
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1 ,100, 100),
    material)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const taurus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material)
taurus.position.x = 1.5
taurus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(taurus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, taurus)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/*
 ** The piece of code adds light to the scene
 */
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y=0.1 * elapsedTime
    plane.rotation.y=0.1 * elapsedTime
    taurus.rotation.y=0.1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()