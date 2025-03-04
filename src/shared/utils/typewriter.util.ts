import pc from 'picocolors';

export function typeWriterEffect(text: string, delay = 100) {
  return new Promise((resolve) => {
    let i = 0;
    function printCharacter() {
      if (i < text.length) {
        const char = String(text[i]); // Asegura que sea un string
        process.stdout.write(pc.green(char)); 
        i++;
        setTimeout(printCharacter, delay);
      } else {
        resolve(0);
      }
    }
    printCharacter();
  });
}
