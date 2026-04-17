import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#FAF9F6", padding: "60px 5%", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Brand */}
        <div style={{ flex: "1 1 300px" }}>
          <div className="logo-container" style={{ marginBottom: "20px" }}>
            <span className="logo-icon">n.</span>
            <span className="logo-text">NOOK</span>
          </div>
          <p style={{ color: "#666", lineHeight: "1.6", maxWidth: "300px" }}>
            Curated homes for the modern traveler. Experience comfort, design, and nature in perfect harmony.
          </p>
        </div>

        {/* Links */}
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Platform</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Stays</a>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Collections</a>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Reviews</a>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Journal</a>
          </div>
        </div>

        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Support</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Help Center</a>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Cancellation Policy</a>
            <a href="#" style={{ textDecoration: "none", color: "#666" }}>Contact Us</a>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ flex: "1 1 300px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>Join the circle</h4>
          <p style={{ color: "#666", marginBottom: "16px" }}>Get the latest updates and hidden gems.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <input 
              type="email" 
              placeholder="Email address" 
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", flex: "1" }}
            />
            <button style={{ padding: "12px 24px", background: "#2D2D2D", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Join
            </button>
          </div>
          <div style={{ display: "flex", gap: "20px", marginTop: "30px", color: "#888" }}>
            <Instagram size={20} />
            <Twitter size={20} />
            <Facebook size={20} />
          </div>
        </div>
      </div>
      
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", marginTop: "60px", paddingTop: "30px", textAlign: "center", color: "#999", fontSize: "14px" }}>
        © 2026 NOOK Stays Inc. All rights reserved.
      </div>
    </footer>
  );
}
