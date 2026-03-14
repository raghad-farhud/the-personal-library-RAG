import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface FileUploadProps {
  accept: string;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAcceptedType(file: File, accept: string): boolean {
  const accepted = accept
    .split(",")
    .map((s) => s.trim().toLowerCase());

  return accepted.some((type) => {
    if (type.startsWith(".")) {
      return file.name.toLowerCase().endsWith(type);
    }
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", "/"));
    }
    return file.type === type;
  });
}

export function FileUpload({
  accept,
  onFileSelect,
  selectedFile,
  onClear,
  className,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (isAcceptedType(file, accept)) {
      onFileSelect(file);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  if (selectedFile) {
    return (
      <div
        className={cn(
          "flex items-center justify-between rounded-xl border border-warm-200 bg-white px-4 py-3",
          className,
        )}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-sans text-warm-800 truncate">
            {selectedFile.name}
          </p>
          <p className="text-xs text-warm-400">
            {formatFileSize(selectedFile.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="ml-4 shrink-0 rounded-lg p-1.5 text-warm-500 hover:bg-cream-200 hover:text-warm-600 transition-colors"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors",
        dragOver
          ? "border-rose-400 bg-rose-100/30"
          : "border-warm-300 bg-cream-100 hover:bg-cream-200",
        className,
      )}
    >
      <Upload className="h-8 w-8 text-warm-400" />
      <div className="text-center">
        <p className="text-sm font-sans text-warm-600">
          Drag & drop your file here, or{" "}
          <span className="font-medium text-rose-500 underline underline-offset-2">
            browse
          </span>
        </p>
        <p className="mt-1 text-xs text-warm-400">
          Accepted: {accept}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
