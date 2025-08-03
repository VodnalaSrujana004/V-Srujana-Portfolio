// EmailJS CDN Integration Script
// Add this to your app/layout.tsx or public/index.html

export const EmailJSScript = () => {
  return (
    <>
      {/* EmailJS CDN */}
      <script 
        type="text/javascript" 
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
      />
      <script type="text/javascript">
        {`
          (function() {
            // Initialize EmailJS with your public key
            if (typeof emailjs !== 'undefined') {
              emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
            }
          })();
        `}
      </script>
    </>
  )
}

// Alternative: You can also add these directly to your layout.tsx head section
