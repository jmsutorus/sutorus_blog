import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/app/_components/container";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 py-20 md:py-32">
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Joseph Sutorus
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to my corner of the internet—where I review, reflect, and ramble about movies, shows, and everything in between.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/reviews">
                <Button size="lg" className="text-lg">
                  Browse Reviews
                </Button>
              </Link>
              <Link href="/database">
                <Button size="lg" variant="outline" className="text-lg">
                  View All Posts
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* About Me Section */}
      <section className="py-20">
        <Container>
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-4xl">About Me</CardTitle>
              <CardDescription className="text-lg">
                A little bit about who I am and what I do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <Avatar className="h-48 w-48 rounded-2xl">
                    <AvatarImage
                      src="https://via.placeholder.com/400x400/6366f1/ffffff?text=JS"
                      alt="Joseph Sutorus"
                    />
                    <AvatarFallback className="text-4xl rounded-2xl">JS</AvatarFallback>
                  </Avatar>
                </div>

                {/* About Text */}
                <div className="space-y-4 text-lg text-muted-foreground flex-1">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/reviews">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle>Latest Reviews</CardTitle>
                    <CardDescription>
                      Check out my most recent thoughts on movies and shows
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/database">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle>Browse Database</CardTitle>
                    <CardDescription>
                      Explore all posts with filtering and search
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/about">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                    <CardDescription>
                      Learn more about me and this project
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
