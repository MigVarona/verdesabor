"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileImage, Loader2, PenTool, LogOut } from "lucide-react";

const categories = ["Nutrition", "Biohacking", "Neuroscience", "Wellness", "Lifestyle", "Longevity"];

const AdminPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: categories[0],
    excerpt: "",
    publishedAt: "",
    image: "",
    imagexl: "",
    text: "",
    image2xl: "",
    text2: "",
  });

  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: `Artículo creado con ID: ${data.insertedId}` });
        setFormData({
          title: "",
          category: categories[0],
          excerpt: "",
          publishedAt: "",
          image: "",
          imagexl: "",
          text: "",
          image2xl: "",
          text2: "",
        });
      } else {
        setStatus({ type: "error", message: `Error: ${data.error}` });
      }
    } catch (error) {
      setStatus({ type: "error", message: `Error: ${(error as any).message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_secret=; path=/; max-age=0; Secure"; // ❌ Borra la cookie
    router.replace("/login"); // 🔄 Redirige a login
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground flex justify-between items-center">
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <PenTool className="h-6 w-6" />
            Create New Article
          </CardTitle>
          <Button onClick={handleLogout} variant="destructive">
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="block mb-1">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="category" className="block mb-1">
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="excerpt" className="block mb-1">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                className="w-full"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="publishedAt" className="block mb-1">
                Published At
              </Label>
              <Input
                type="datetime-local"
                id="publishedAt"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="text" className="block mb-1">
                    Text
                  </Label>
                  <Textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    className="w-full"
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="text2" className="block mb-1">
                    Text 2
                  </Label>
                  <Textarea
                    id="text2"
                    name="text2"
                    value={formData.text2}
                    onChange={handleChange}
                    className="w-full"
                    rows={6}
                  />
                </div>
              </TabsContent>
              <TabsContent value="images" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image" className="block mb-1">
                      Image URL
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="flex-grow"
                      />
                      <FileImage className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="imagexl" className="block mb-1">
                      ImageXL URL
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="url"
                        id="imagexl"
                        name="imagexl"
                        value={formData.imagexl}
                        onChange={handleChange}
                        className="flex-grow"
                      />
                      <FileImage className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="image2xl" className="block mb-1">
                    Image2XL URL
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="url"
                      id="image2xl"
                      name="image2xl"
                      value={formData.image2xl}
                      onChange={handleChange}
                      className="flex-grow"
                    />
                    <FileImage className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Article...
                </>
              ) : (
                "Create Article"
              )}
            </Button>
          </form>
          {status && (
            <Alert className={`mt-6 ${status.type === "success" ? "bg-green-50" : "bg-red-50"}`}>
              <AlertTitle>{status.type === "success" ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
