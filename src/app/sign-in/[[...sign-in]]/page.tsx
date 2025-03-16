import { SignIn } from "@clerk/nextjs"
import { Scale } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-7">
                <div className="flex justify-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Scale className="h-8 w-8 text-law-secondary" />
                        <span className="text-2xl font-bold text-law-primary">LawGPT</span>
                    </Link>
                </div>

            </div>

            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-law-primary hover:bg-law-primary/90 text-sm normal-case",
                        footerActionLink: "text-law-primary hover:text-law-primary/90",
                    },
                }}
                fallbackRedirectUrl={"/chat"}
            />

        </div>
    )
}

