// FlippingBook.jsx
import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Home, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const RuledPage = React.forwardRef(
  ({ pageIndex, values, setValues, isEditing, setEditing }, ref) => {
    const LINE = 28;
    const textareaRef = React.useRef(null);

    React.useEffect(() => {
      if (isEditing === pageIndex && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [isEditing, pageIndex]);

    return (
      <div
        ref={ref}
        className="w-full h-full relative rounded-md shadow-md border border-yellow-900/40 
                   bg-[#c8c6c1] cursor-text"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent ${LINE - 1}px,
              rgba(70, 130, 180, 0.25) ${LINE - 1}px,
              rgba(70, 130, 180, 0.25) ${LINE}px
            )
          `,
          backgroundSize: `100% ${LINE}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setEditing(pageIndex);
        }}
      >
        {/* Vintage red margin line */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: 56,
            width: 2,
            background: "rgba(220, 38, 38, 0.5)",
          }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={values[pageIndex]}
          onChange={(e) => {
            const next = [...values];
            next[pageIndex] = e.target.value;
            setValues(next);
          }}
          readOnly={isEditing !== pageIndex}
          className="absolute inset-0 w-full h-full bg-transparent outline-none resize-none 
                     text-[16px] leading-[28px] p-6 pt-6 pr-6 font-serif text-gray-800"
          style={{
            paddingLeft: 72,
          }}
        />

        {/* Page Number */}
        <span className="absolute bottom-2 right-4 text-xs text-gray-700 font-serif opacity-70">
          {pageIndex + 1}
        </span>
      </div>
    );
  }
);



export default function Notebook() {
  const [pages, setPages] = useState(Array(20).fill(""));
  const [isEditing, setEditing] = useState(null);
  const bookRef = useRef(null);
  const navigate = useNavigate();


  const flipPrev = () => {
    setEditing(null);
    bookRef.current?.pageFlip().flipPrev();
  };
  const flipNext = () => {
    setEditing(null);
    bookRef.current?.pageFlip().flipNext();
  };
  const flipFirst = () => {
    setEditing(null);
    bookRef.current?.pageFlip().flip(0);
  };
  const flipLast = () => {
    setEditing(null);
    bookRef.current?.pageFlip().flip(pages.length - 1);
  };

  // 🔹 Add more pages dynamically
  const addPages = (count = 10) => {
    setPages((prev) => [...prev, ...Array(count).fill("")]);
    setTimeout(() => {
      bookRef.current?.pageFlip().flip(pages.length);
    }, 300);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center 
                 bg-gradient-to-b from-purple-950 via-purple-900 to-black py-4"
      onClick={() => setEditing(null)}
    >

      {/* 🔹 Home Button (floating top-left corner) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/");
        }}
        className="absolute top-4 left-4 p-2 rounded-full 
                  bg-purple-900 hover:bg-purple-600 text-white shadow-lg transition cursor-pointer"
      >
        <Home size={22} />
      </button>

      {/* 🔹 Add Pages Button (floating top-right corner) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addPages(10);
        }}
        className="absolute top-4 right-4 px-5 py-2 rounded-full flex items-center gap-2
                   bg-green-700 hover:bg-green-600 text-white font-medium shadow-lg transition cursor-pointer"
      >
         <Plus/>
         <span className="text-sm font-medium">Add 10 Pages</span>
      </button>

      <h1 className="text-3xl font-bold text-white mb-6 font-comicsans">My Journal</h1>

      <HTMLFlipBook
        ref={bookRef}
        width={420}
        height={300}
        size="stretch"
        showCover={false}
        drawShadow
        maxShadowOpacity={0.4}
        flippingTime={900}
        useMouseEvents={false}
        mobileScrollSupport={true}
        className="shadow-2xl rounded-lg border border-purple-700"
      >
        {pages.map((_, i) => (
          <RuledPage
            key={i}
            pageIndex={i}
            values={pages}
            setValues={setPages}
            isEditing={isEditing}
            setEditing={setEditing}
          />
        ))}
      </HTMLFlipBook>

      {/* Navigation */}
      <div className="mt-8 flex flex-wrap gap-4 z-10 justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            flipFirst();
          }}
          className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-sm cursor-pointer"
        >
          Jump to First
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            flipPrev();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                     bg-purple-700 hover:bg-purple-600 text-white font-medium transition cursor-pointer"
        >
          <ChevronLeft size={20} />
          Prev
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            flipNext();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                     bg-purple-700 hover:bg-purple-600 text-white font-medium transition cursor-pointer"
        >
          Next
          <ChevronRight size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            flipLast();
          }}
          className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-sm cursor-pointer"
        >
          Jump to Last
        </button>
      </div>
    </div>
    
  );
}
