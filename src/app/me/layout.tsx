import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function MeLayour({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser()
    if (!user) {
        return notFound()
    }
    return (
        <div>
            <h1>Usuario: {user.name}</h1>
            {children}
        </div>
    )
}