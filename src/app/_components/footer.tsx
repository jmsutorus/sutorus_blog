import Container from "@/app/_components/container";
import { Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/jmsutorus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/josephsutorus/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Joseph Sutorus. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
