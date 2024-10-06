import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function MeLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser()
    if (!session) {
        return notFound()
    }
    return (
        <div>
            <h1>Usuario: {session.user.name}</h1>
            {children}
        </div>
    )
}