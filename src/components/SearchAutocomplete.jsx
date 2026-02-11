import React, { useState, useEffect, useRef } from "react";
import { Search, X, Book, PlayCircle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dataService } from "../services/dataService";

const SearchAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      const hits = dataService.search(query).slice(0, 5); // Limit to 5 suggestions
      setResults(hits);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <BookOpen size={16} className="text-primary" />;
      case "lecture":
        return <PlayCircle size={16} className="text-secondary" />;
      case "book":
        return <Book size={16} className="text-accent" />;
      default:
        return <Search size={16} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "course":
        return "دورة";
      case "lecture":
        return "درس";
      case "book":
        return "كتاب";
      default:
        return "";
    }
  };

  const handleSelect = (item) => {
    setQuery("");
    setIsOpen(false);
    if (item.type === "course") navigate(`/course/${item.id}`);
    else if (item.type === "lecture")
      navigate(`/lesson/${item.courseId || item.id}/${item.id}`); // Correct navigation for lecture depends on if courseId is present
    else if (item.type === "book") navigate(`/books`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl hidden md:block">
      <form onSubmit={handleSearchSubmit} className="relative group">
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Search
            size={18}
            className="text-slate-400 group-focus-within:text-primary transition-colors"
          />
        </div>
        <input
          type="text"
          placeholder="ابحث عن درس، شيخ، أو كتاب..."
          className="w-full bg-black/5 dark:bg-white/5 border-none rounded-full py-2.5 pr-10 pl-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all text-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 1 && setIsOpen(true)}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-red-500"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-surface rounded-2xl shadow-xl border border-subtle overflow-hidden z-50 fade-in">
          <ul className="py-2">
            {results.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-right transition-colors"
                >
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="font-bold text-primary text-sm line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted flex items-center gap-1">
                      <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px]">
                        {getTypeLabel(item.type)}
                      </span>
                      {item.instructor && <span>• {item.instructor}</span>}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSearchSubmit}
            className="w-full block bg-slate-50 dark:bg-slate-800 p-3 text-xs text-center text-primary font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            عرض جميع النتائج لـ "{query}"
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
