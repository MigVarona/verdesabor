"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    publishedAt: "",
    image: "",
    imagexl: "",
    text: "",
    image2xl: "",
    text2: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(`Article created successfully with ID: ${data.insertedId}`);
        setFormData({
          title: "",
          category: "",
          excerpt: "",
          publishedAt: "",
          image: "",
          imagexl: "",
          text: "",
          image2xl: "",
          text2: "",
        });
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${(error as any).message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Admin - Create New Article
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
            </div>
            <div>
              <Label htmlFor="category" className="block mb-1">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
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
              />
            </div>
            <div>
              <Label htmlFor="image" className="block mb-1">
                Image URL
              </Label>
              <Input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="imagel" className="block mb-1">
                Imagel URL
              </Label>
             
            </div>
            <div>
              <Label htmlFor="imagexl" className="block mb-1">
                ImageXL URL
              </Label>
              <Input
                type="url"
                id="imagexl"
                name="imagexl"
                value={formData.imagexl}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="text" className="block mb-1">
                Text
              </Label>
              <Textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="image2xl" className="block mb-1">
                Image2XL URL
              </Label>
              <Input
                type="url"
                id="image2xl"
                name="image2xl"
                value={formData.image2xl}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="text2" className="block mb-1">
                Text2
              </Label>
              <Textarea
                id="text2"
                name="text2"
                value={formData.text2}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="mt-4">
              Create Article
            </Button>
          </form>
          {status && <p className="mt-4 text-center">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
