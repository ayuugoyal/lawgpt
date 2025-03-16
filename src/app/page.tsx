"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, LogIn, Scale, Shield, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme-dependent content after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === 'dark'

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-3 flex justify-center border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-law-secondary" />
            <span className="text-xl font-bold text-law-primary">LawGPT</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#use-cases"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Use Cases
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {isLoaded && isSignedIn ? (
              <>
                <Link href="/chat">
                  <Button variant="default" className="bg-law-primary hover:bg-law-primary/90">
                    Start Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-law-primary hover:text-law-primary/90">
                    Sign In
                    <LogIn className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="default" className="bg-law-primary hover:bg-law-primary/90">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative flex justify-center px-3 overflow-hidden py-20 md:py-32 ${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-950' : 'bg-gradient-to-b from-white to-gray-50'}`}>
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs w-fit font-semibold bg-law-secondary/10 text-law-secondary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  AI-Powered Legal Assistant
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-law-primary">
                  Legal Guidance <br />
                  <span className="text-law-secondary">Simplified</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px]">
                  Get instant answers to your legal questions with our AI-powered assistant. Understand complex legal
                  concepts in simple terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {isLoaded && isSignedIn ? (
                    <Link href="/chat">
                      <Button size="lg" className="bg-law-primary hover:bg-law-primary/90">
                        Start Chatting Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/sign-up">
                      <Button size="lg" className="bg-law-primary hover:bg-law-primary/90">
                        Sign Up Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}

                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-6"
              >
                <div className={`relative ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="bg-law-primary p-3 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-white text-sm font-medium">LawGPT Assistant</div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-end">
                      <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3 max-w-[80%]`}>
                        <p className="text-sm">What are my rights as a tenant?</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className={`${isDark ? 'bg-law-primary/20' : 'bg-law-primary/10'} rounded-lg p-3 max-w-[80%]`}>
                        <p className="text-sm">
                          As a tenant, you generally have the following rights:
                          <br />
                          <br />
                          1. Right to habitable housing
                          <br />
                          2. Right to privacy
                          <br />
                          3. Protection against discrimination
                          <br />
                          4. Security deposit protections
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-law-secondary/20 rounded-xl"></div>
              </motion.div>
            </div>
          </div>

          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className={`absolute -top-[10%] -right-[10%] w-[40%] h-[40%] ${isDark ? 'bg-law-secondary/5' : 'bg-law-secondary/10'} rounded-full blur-3xl`}></div>
            <div className={`absolute top-[60%] -left-[5%] w-[30%] h-[40%] ${isDark ? 'bg-law-primary/5' : 'bg-law-primary/10'} rounded-full blur-3xl`}></div>
          </div>
        </section >

        {/* Features Section */}
        < section id="features" className={`py-20 flex justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`} >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-law-primary mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered legal assistant provides comprehensive support for all your legal inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
              <Card className={`${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/50' : 'bg-white border-none'} shadow-lg hover:shadow-xl transition-shadow`}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-law-primary/10 flex items-center justify-center mb-4">
                    <Scale className="h-6 w-6 text-law-primary" />
                  </div>
                  <CardTitle className="text-xl">Legal Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get insights on legal precedents, statutes, and regulations across various practice areas.
                  </p>
                </CardContent>
              </Card>

              <Card className={`${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/50' : 'bg-white border-none'} shadow-lg hover:shadow-xl transition-shadow`}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-law-secondary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-law-secondary" />
                  </div>
                  <CardTitle className="text-xl">Document Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand legal documents, contracts, and agreements with simplified explanations.
                  </p>
                </CardContent>
              </Card>

              <Card className={`${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/50' : 'bg-white border-none'} shadow-lg hover:shadow-xl transition-shadow`}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-law-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-law-primary" />
                  </div>
                  <CardTitle className="text-xl">Personal Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn about your rights in various situations, from employment to housing and beyond.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section >

        {/* Use Cases Section */}
        < section id="use-cases" className={`py-20 flex justify-center ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`} >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-law-primary mb-4">How It Helps</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore how our AI legal assistant can help in different scenarios.
              </p>
            </div>

            <Tabs defaultValue="individuals" className="max-w-3xl mx-4 sm:mx-auto">
              <TabsList className={`grid w-full grid-cols-3 mb-8 ${isDark ? 'bg-gray-800' : ''}`}>
                <TabsTrigger value="individuals">Individuals</TabsTrigger>
                <TabsTrigger value="businesses">Businesses</TabsTrigger>
                <TabsTrigger value="students">Law Students</TabsTrigger>
              </TabsList>
              <TabsContent value="individuals" className="space-y-4">
                <Card className={isDark ? 'border-gray-700' : ''}>
                  <CardHeader>
                    <CardTitle>Personal Legal Matters</CardTitle>
                    <CardDescription>Get guidance on everyday legal questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Understand your rights in landlord-tenant disputes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Navigate employment law questions and workplace issues</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Get clarity on family law matters like divorce and custody</p>
                    </div>
                  </CardContent>

                </Card>
              </TabsContent>
              <TabsContent value="businesses" className="space-y-4">
                <Card className={isDark ? 'border-gray-700' : ''}>
                  <CardHeader>
                    <CardTitle>Business Legal Support</CardTitle>
                    <CardDescription>Help with business legal questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Understand contract terms and legal obligations</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Get information on business formation and compliance</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Learn about intellectual property protection</p>
                    </div>
                  </CardContent>

                </Card>
              </TabsContent>
              <TabsContent value="students" className="space-y-4">
                <Card className={isDark ? 'border-gray-700' : ''}>
                  <CardHeader>
                    <CardTitle>Law Education</CardTitle>
                    <CardDescription>Support for law students and legal education</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Get explanations of complex legal concepts and terminology</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Find summaries of important case law and precedents</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Practice legal reasoning with hypothetical scenarios</p>
                    </div>
                  </CardContent>

                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section >

        {/* FAQ Section */}
        < section id="faq" className={`py-20 flex justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`} >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-law-primary mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our AI legal assistant.
              </p>
            </div>

            <div className="max-w-3xl mx-4 sm:mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is this actual legal advice?</AccordionTrigger>
                  <AccordionContent>
                    No, our AI assistant provides legal information and education only. It is not a substitute for
                    professional legal advice from a qualified attorney. Always consult with a licensed attorney for
                    specific legal matters.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How accurate is the information?</AccordionTrigger>
                  <AccordionContent>
                    Our AI is trained on a wide range of legal resources and is designed to provide general legal
                    information. However, laws vary by jurisdiction and change over time. Always verify information with
                    official sources.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is my conversation private?</AccordionTrigger>
                  <AccordionContent>
                    We take privacy seriously. Your conversations are encrypted and we do not store personally
                    identifiable information. However, anonymized data may be used to improve our service.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What areas of law does it cover?</AccordionTrigger>
                  <AccordionContent>
                    Our AI assistant covers a wide range of legal topics including but not limited to: family law,
                    employment law, housing law, business law, intellectual property, and consumer rights. However, its
                    knowledge has limitations and may not cover highly specialized areas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I use this for my legal documents?</AccordionTrigger>
                  <AccordionContent>
                    While our AI can help explain legal documents, it should not be used to draft or finalize important
                    legal documents without professional review. For critical legal documents, always consult with a
                    qualified attorney.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section >

        {/* CTA Section */}
        < section className="py-20 flex justify-center bg-law-primary text-white" >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-white/80 mb-8">
                Start chatting with our AI legal assistant today and get the legal information you need.
              </p>
              <Link href={isSignedIn ? "/chat" : "/sign-up"}>
                <Button size="lg" className="bg-law-secondary hover:bg-law-secondary/90 text-black">
                  {isSignedIn ? "Start Chatting Now" : "Sign Up Free"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section >
      </main >

      <footer className={`border-t flex justify-center py-8 ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50'}`}>

        <div className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} LawGPT. All rights reserved.
          <br />
          Build with <span className="text-law-primary">♥</span> by{' '}
          <a href="https://ayuugoyal.tech" className="text-law-primary hover:underline">ayuugoyal</a>
        </div>

      </footer>
    </div >
  )
}

