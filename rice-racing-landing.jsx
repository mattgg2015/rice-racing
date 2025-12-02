import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function RiceRacingLanding() {
  const mountRef = useRef(null);
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const lines = [
    "We're building Rice's first ever Formula SAE car.",
    "We're looking for the most talented engineers at Rice.",
    "Join us."
  ];

  // Typing animation effect
  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + currentLine[charIndex]);
        setCharIndex(charIndex + 1);
      }, 50); // typing speed
      return () => clearTimeout(timeout);
    } else if (lineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setText(prev => prev + '\n');
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 800); // pause between lines
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  // Three.js GLTF car loader with holographic effect
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting for the model
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    let carModel;
    
    loader.load(
      './formula_1.glb',
      (gltf) => {
        carModel = gltf.scene;
        
        // Apply holographic see-through white material to all meshes
        carModel.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xffffff,
              metalness: 0.2,
              roughness: 0.1,
              transparent: true,
              opacity: 0.3,
              emissive: 0x4287f5,
              emissiveIntensity: 0.5,
              side: THREE.DoubleSide,
            });
            
            // Add wireframe overlay for extra holographic effect
            const wireframeGeo = new THREE.WireframeGeometry(child.geometry);
            const wireframeMat = new THREE.LineBasicMaterial({ 
              color: 0xffffff, 
              transparent: true,
              opacity: 0.4,
              linewidth: 1
            });
            const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
            child.add(wireframe);
          }
        });
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        carModel.scale.multiplyScalar(scale);
        
        carModel.position.x = -center.x * scale;
        carModel.position.y = -center.y * scale + 0.5;
        carModel.position.z = -center.z * scale;
        
        scene.add(carModel);
      },
      (progress) => {
        console.log('Loading:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    camera.position.z = 6;
    camera.position.y = 2.5;
    camera.position.x = -1;
    camera.lookAt(0, 0.8, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (carModel) {
        carModel.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      background: '#1a2b4a' // Rice blue base
    }}>
      {/* Blueprint grid background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(66, 135, 245, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(66, 135, 245, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 1
      }} />

      {/* Stronger grid lines every 5th line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(66, 135, 245, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(66, 135, 245, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '200px 200px',
        zIndex: 1
      }} />

      {/* Logo placeholder - top left */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        zIndex: 10,
        color: 'white',
        fontSize: '24px',
        fontWeight: '700',
        letterSpacing: '2px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        RICE RACING
      </div>

      {/* Three.js canvas container */}
      <div 
        ref={mountRef} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          opacity: 0.4
        }} 
      />

      {/* Typing text overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
        textAlign: 'center',
        width: '90%',
        maxWidth: '900px'
      }}>
        <div style={{
          color: 'white',
          fontSize: 'clamp(24px, 4vw, 48px)',
          fontWeight: '300',
          lineHeight: '1.6',
          fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.5px',
          whiteSpace: 'pre-wrap',
          textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
        }}>
          {text}
          <span style={{
            opacity: lineIndex < lines.length ? 1 : 0,
            animation: 'blink 1s infinite',
            marginLeft: '2px'
          }}>|</span>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderTop: '2px solid rgba(66, 135, 245, 0.5)',
        borderRight: '2px solid rgba(66, 135, 245, 0.5)',
        zIndex: 10
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        borderBottom: '2px solid rgba(66, 135, 245, 0.5)',
        borderLeft: '2px solid rgba(66, 135, 245, 0.5)',
        zIndex: 10
      }} />

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        body {
          margin: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
