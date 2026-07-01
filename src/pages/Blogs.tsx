import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/data/blogs";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Tag, 
  ChevronRight,
  Share2,
  Check,
  Bookmark,
  BookOpen
} from "lucide-react";

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const selectedPostId = searchParams.get("post");

  const setSelectedPostId = (id: string | null) => {
    if (id) {
      setSearchParams({ post: id });
    } else {
      setSearchParams({});
    }
  };

  const categories = useMemo(() => {
    const list = new Set(blogPosts.map(post => post.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const selectedPost = useMemo(() => {
    return blogPosts.find(post => post.id === selectedPostId) || null;
  }, [selectedPostId]);

  const featuredPost = useMemo(() => {
    return blogPosts.find(post => post.featured) || blogPosts[0];
  }, []);

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blogs?post=${post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-4"
            >
              {/* Header */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-highlight text-sm font-semibold mb-4"
                >
                  <BookOpen size={14} /> Insights & Knowledge
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                >
                  SenaniTech <span className="gradient-text-bright">Blogs</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground"
                >
                  Deep dives into semiconductor testing, high-speed PCB engineering, power integrity simulation, and industry innovations.
                </motion.p>
              </div>

              {/* Featured Post Banner */}
              {featuredPost && searchTerm === "" && selectedCategory === "All" && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-6xl mx-auto mb-16"
                >
                  <div 
                    onClick={() => setSelectedPostId(featuredPost.id)}
                    className="group bg-card border border-border/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 grid lg:grid-cols-12 gap-0 cursor-pointer"
                  >
                    <div className="lg:col-span-7 relative overflow-hidden min-h-[300px] lg:min-h-[400px]">
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={featuredPost.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          Featured Post
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} /> {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} /> {featuredPost.readTime}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-highlight transition-colors leading-snug">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mb-6 line-clamp-3 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-highlight text-sm border border-primary/20">
                            {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{featuredPost.author.name}</p>
                            <p className="text-xs text-muted-foreground">{featuredPost.author.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted"
                            onClick={(e) => toggleBookmark(featuredPost.id, e)}
                          >
                            <Bookmark 
                              size={16} 
                              className={bookmarked[featuredPost.id] ? "fill-highlight text-highlight" : "text-muted-foreground"} 
                            />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted"
                            onClick={(e) => handleShare(featuredPost, e)}
                          >
                            {copiedId === featuredPost.id ? <Check size={16} className="text-highlight" /> : <Share2 size={16} />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Controls (Filters & Search) */}
              <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 order-2 md:order-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        selectedCategory === category
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80 order-1 md:order-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Search articles or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: "2.75rem" }}
                    className="w-full pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              {/* Post Grid */}
              <div className="max-w-6xl mx-auto">
                {filteredPosts.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        variants={cardVariants}
                        onClick={() => setSelectedPostId(post.id)}
                        className="group bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                      >
                        <div>
                          {/* Image */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-card/90 backdrop-blur-md text-foreground text-xs font-semibold px-2.5 py-1 rounded-lg border border-border">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-6">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} /> {post.date}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {post.readTime}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-highlight transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h3>

                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 pt-0 mt-auto border-t border-border/55 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-highlight text-xs border border-primary/20">
                              {post.author.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">{post.author.name}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => toggleBookmark(post.id, e)}
                              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-highlight transition-colors"
                            >
                              <Bookmark size={15} className={bookmarked[post.id] ? "fill-highlight text-highlight" : ""} />
                            </button>
                            <button
                              onClick={(e) => handleShare(post, e)}
                              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-highlight transition-colors"
                            >
                              {copiedId === post.id ? <Check size={15} className="text-highlight" /> : <Share2 size={15} />}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-20 bg-card border border-dashed border-border rounded-2xl">
                    <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.article
              key="detail-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="container mx-auto px-4 max-w-4xl"
            >
              {/* Back Button */}
              <div className="mb-8">
                <button
                  onClick={() => setSelectedPostId(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-highlight transition-colors cursor-pointer group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Articles
                </button>
              </div>

              {/* Category Badge */}
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-primary/10 text-highlight text-sm font-semibold mb-4">
                {selectedPost.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-card border border-border rounded-2xl mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-highlight text-base border border-primary/20">
                    {selectedPost.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{selectedPost.author.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedPost.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={15} /> {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} /> {selectedPost.readTime}
                  </span>
                </div>
              </div>

              {/* Banner Image */}
              <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-border shadow-md mb-10">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Markdown Content (Rendered beautifully with standard CSS class) */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed mb-12">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // Heading h3
                  if (trimmed.startsWith('### ')) {
                    return <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">{trimmed.slice(4)}</h3>;
                  }
                  // Heading h4
                  if (trimmed.startsWith('#### ')) {
                    return <h4 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">{trimmed.slice(5)}</h4>;
                  }
                  // Divider
                  if (trimmed === '---') {
                    return <hr key={index} className="my-8 border-border" />;
                  }
                  // Bullets
                  if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                        {trimmed.split('\n').map((li, i) => (
                          <li key={i}>{li.replace(/^[\*\-]\s+/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  // Quote or Callout
                  if (trimmed.startsWith('> ') || trimmed.startsWith('*At SenaniTech')) {
                    return (
                      <blockquote key={index} className="border-l-4 border-primary pl-4 py-1.5 my-6 italic bg-primary/5 rounded-r-lg text-muted-foreground">
                        {trimmed.replace(/^>\s+/, '').replace(/^\*/, '').replace(/\*$/, '')}
                      </blockquote>
                    );
                  }

                  // Normal paragraph
                  return <p key={index} className="mb-6" dangerouslySetInnerHTML={{ 
                    __html: trimmed
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }} />;
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border mb-12">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5 mr-2">
                  <Tag size={14} /> Tags:
                </span>
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-semibold hover:text-foreground transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Next steps CTA */}
              <div className="p-8 rounded-3xl bg-secondary/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Have questions about these technologies?</h3>
                  <p className="text-sm text-muted-foreground">Get in touch with our experts to discuss your requirements.</p>
                </div>
                <Button onClick={() => window.location.href = '/contact'} className="shrink-0 bg-primary hover:bg-primary-hover text-white flex items-center gap-2">
                  Contact Our Engineers <ChevronRight size={16} />
                </Button>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
