"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/error-boundary"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

async function fetchTranslation(word: string) {
  const response = await fetch(`/api/translations?word=${encodeURIComponent(word)}`)
  if (!response.ok) {
    throw new Error("Failed to fetch translation")
  }
  return response.json()
}

export default function TranslatorPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: translation,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["translation", searchTerm],
    queryFn: () => fetchTranslation(searchTerm),
    enabled: false,
    retry: 1,
  })

  const handleTranslate = () => {
    if (searchTerm.trim()) {
      refetch()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <ErrorBoundary>
          <Card className="mx-auto max-w-lg">
            <CardHeader>
              <CardTitle className="text-center">English to Balti Translator</CardTitle>
              <CardDescription className="text-center">
                Enter an English word to get its Balti translation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter an English word..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTranslate()
                    }
                  }}
                />
                <Button onClick={handleTranslate} disabled={isLoading}>
                  <Search className="mr-2 h-4 w-4" />
                  Translate
                </Button>
              </div>

              {isLoading ? (
                <div className="mt-8 space-y-4">
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-[100px] w-full" />
                </div>
              ) : translation ? (
                <div className="mt-8 space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-sm text-muted-foreground">English:</div>
                    <div className="mt-1 text-lg font-medium">{translation.english}</div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-sm text-muted-foreground">Balti:</div>
                    <div className="mt-1 text-lg font-medium">{translation.balti}</div>
                    {translation.pronunciation && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Pronunciation: /{translation.pronunciation}/
                      </div>
                    )}
                    {translation.category && (
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {translation.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : error ? (
                <div className="mt-8">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {error instanceof Error ? error.message : "Failed to fetch translation"}
                    </AlertDescription>
                  </Alert>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
    </main>
  )
}

