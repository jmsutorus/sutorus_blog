import { Metadata } from 'next';
import Container from '@/app/_components/container';
import { Github, Instagram, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - Joseph Sutorus',
  description: 'Get in touch with Joseph Sutorus',
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'd love to hear from you. Whether you want to discuss storytelling,
              collaborate on a project, or just say hello.
            </p>
            <div className="w-24 h-1 bg-primary rounded-full mt-6 mx-auto"></div>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Email */}
            <a
              href="mailto:contact@josephsutorus.com"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Email
                </h3>
              </div>
              <p className="text-foreground/80 mb-2">
                Send me an email for collaborations or inquiries
              </p>
              <p className="text-primary font-medium">
                contact@josephsutorus.com
              </p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/jmsutorus"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  GitHub
                </h3>
              </div>
              <p className="text-foreground/80 mb-2">
                Check out my code and projects
              </p>
              <p className="text-primary font-medium">
                @jmsutorus
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/josephsutorus/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Instagram className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Instagram
                </h3>
              </div>
              <p className="text-foreground/80 mb-2">
                Follow for updates and behind-the-scenes
              </p>
              <p className="text-primary font-medium">
                @josephsutorus
              </p>
            </a>

            {/* General Inquiries */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Response Time
                </h3>
              </div>
              <p className="text-foreground/80">
                I typically respond to emails within 24-48 hours.
                Looking forward to connecting with you!
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 p-8 bg-muted/30 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Based in the United States
            </h2>
            <p className="text-lg text-foreground/80">
              Open to remote collaborations and projects worldwide.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
