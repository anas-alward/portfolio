function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
            <a
                href="/"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
            >
                Go Back Home
            </a>
        </div>
    )
}

export default NotFoundPage;