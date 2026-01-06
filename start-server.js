#!/usr/bin/env node

const { exec } = require('child_process');
const { spawn } = require('child_process');
const os = require('os');

// Função para obter o IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Pula interfaces internas e não IPv4
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

console.log('\n🚀 Iniciando Shopee Xpress - Controle de Bipagem\n');
console.log('📱 Acesse de qualquer dispositivo na mesma rede:\n');
console.log(`   Local:   http://localhost:3000`);
console.log(`   Network: http://${localIP}:3000`);
console.log('\n✨ Servidor iniciando...\n');

// Inicia o Next.js
const next = spawn('npx', ['next', 'dev', '-H', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true
});

next.on('close', (code) => {
  process.exit(code);
});
