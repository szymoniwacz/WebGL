// SKETCHUP do modelowania obiektow 3d
// sketchuv - narzedzie ktorego normalnie nie ma ale on uzywa do rysowania

document.addEventListener("DOMContentLoaded", function() {

  var cont = document.getElementById('cont');
  var renderer = new THREE.WebGLRenderer ({antialias: true});
  renderer.setSize(cont.clientWidth, cont.clientHeight);
  cont.appendChild(renderer.domElement);
  renderer.setClearColorHex(0x000000, 0);
  renderer.clear();
  
  // CAMERA: field of view (angle), aspect ratio, near, far
  var aspect = cont.clientWidth / cont.clientHeight
  var camera = new THREE.PerspectiveCamera(35, aspect, 1, 3000);
  camera.position.z = 300;
  var scene = new THREE.Scene();
  
  var loader = new THREE.ColladaLoader();
  loader.options.convertUpAxis= true;
  loader.options.upAxis = 'Y';
  var model;
  loader.load("../models/Android.dae",
  function(collada) {
    model = collada.scene;
    model.position.set(0, -50, 0);
    model.scale.set(2,2,2);

    var enviro = new THREE.ImageUtils.loadTextureCube(['../textures/cnitcube3.jpg', '../textures/cnitcube1.jpg', 
                                                       '../textures/cnitcube6.jpg', '../textures/cnitcube5.jpg',
                                                       '../textures/cnitcube2.jpg', '../textures/cnitcube4.jpg']);
    
    var texture = new THREE.ImageUtils.loadTexture('../textures/FernandoTogniBW.png');
    var material = new THREE.MeshPhongMaterial({
      color: 0xA4C639+0x101010,
      bumpMap: texture,
      bumpScale: 3,
      envMap: enviro
    });
    
    model.traverse(function(child) {
      if (child instanceof THREE.Mesh && !(child.name in {ID79:0, ID93:0})) {
        child.geometry.computeTangents();
        child.material = material;
      }
    });
    
    scene.add(model);
    
    function animate(t) {
      model.rotation.y = t/1000;
      model.position.x = 50*Math.cos(t/1000);
      model.position.z = 50*Math.sin(t/1000);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  });
  
  var light1 = new THREE.DirectionalLight(0xffffff, 0.6); // color, intens.
  light1.position.set(-1, -1, 0.3); // SW directional light
  var light2 = new THREE.PointLight(0xffffff, 0.6); // color, intens.
  light2.position.set(200, 200, 300); // NE point light
  var light3 = new THREE.DirectionalLight(0xffffff, 0.5); // color, intens.
  light3.position.set(0, 0, 1); // frontal light
  scene.add(light1); scene.add(light2); scene.add(light3); // add them all
});