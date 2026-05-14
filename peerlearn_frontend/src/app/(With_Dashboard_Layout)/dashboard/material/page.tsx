"use client"

import { useGetRequestByCallIdQuery } from "@/redux/api/requestApi"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import {
  BookOpen,
  Calendar,
  Clock3,
  FileUp,
  GraduationCap,
  Mail,
  Upload,
  FileText,
  X,
} from "lucide-react"
import { useState } from "react"
import { useCreateQuestionsMutation } from "@/redux/api/questionApi"

const Material_Upload_Page = () => {
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState("")

  const searchParams = useSearchParams()
  const call_id = searchParams.get("call_id")

  const { data, isLoading } = useGetRequestByCallIdQuery({
    call_id: call_id!,
  })
  const [createQuestions] = useCreateQuestionsMutation();

  const handleSubmitMaterial = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const res = await createQuestions({
      id: data?.id,
      files:files,
      message:message
    })
    console.log(res)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1 space-y-6">

          {/* Student Info */}
          <div className="custom-glass rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-indigo-500/30">
                <Image
                  src={
                    data?.req_maker?.photo_url ||
                    "https://i.pinimg.com/736x/b2/95/0c/b2950c0b115d221d66508c6c1247d929.jpg"
                  }
                  alt="Student"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {data?.req_maker?.first_name}{" "}
                  {data?.req_maker?.last_name}
                </h2>

                <p className="text-slate-400 text-sm">
                  {data?.req_maker?.academicInfo?.department}
                </p>
              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-indigo-400" />

                <span className="text-sm break-all">
                  {data?.req_maker?.email}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <GraduationCap className="w-5 h-5 text-pink-400" />

                <span className="text-sm">
                  Department:{" "}
                  {data?.req_maker?.academicInfo?.department}
                </span>
              </div>

            </div>

          </div>

          {/* Request Details */}
          <div className="custom-glass rounded-3xl p-6">

            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-indigo-400" />

              <h3 className="text-xl font-bold">
                Request Details
              </h3>
            </div>

            <div className="space-y-5">

              <div>
                <p className="text-slate-500 text-sm mb-1">
                  Title
                </p>

                <h4 className="font-semibold text-lg">
                  {data?.title}
                </h4>
              </div>

              <div>
                <p className="text-slate-500 text-sm mb-1">
                  Message
                </p>

                <p className="text-slate-300 leading-relaxed">
                  {data?.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white/5 rounded-2xl p-4">

                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />

                    <span className="text-sm text-slate-400">
                      Created
                    </span>
                  </div>

                  <p className="font-medium text-sm">
                    {data?.created_at}
                  </p>

                </div>

                <div className="bg-white/5 rounded-2xl p-4">

                  <div className="flex items-center gap-2 mb-2">
                    <Clock3 className="w-4 h-4 text-pink-400" />

                    <span className="text-sm text-slate-400">
                      Call Time
                    </span>
                  </div>

                  <p className="font-medium text-sm">
                    {data?.call_start_at}
                  </p>

                </div>

              </div>

              <div>
                <span
                  className={`
                    px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider
                    ${
                      data?.status === "ACCEPTED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                >
                  {data?.status}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">

          <form
            onSubmit={handleSubmitMaterial}
            className="custom-glass rounded-3xl p-8 h-full"
          >

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                <Upload className="text-indigo-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Upload Study Materials
                </h2>

                <p className="text-slate-400 text-sm">
                  Share notes, PDFs, docs, videos and more
                </p>
              </div>

            </div>

            {/* Upload Box */}
            <label className="border-2 border-dashed border-white/10 hover:border-indigo-500/40 transition-all rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white/5 hover:bg-white/[0.07]">

              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <FileUp className="w-8 h-8 text-indigo-400" />
              </div>

              <h3 className="text-xl font-bold mb-2">
                Upload Files
              </h3>

              <p className="text-slate-400 mb-5 text-sm max-w-md">
                PDF, DOCX, PPT, Images and more
              </p>

              <div className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-2xl font-semibold transition-all">
                Choose Files
              </div>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) =>
                  setFiles(Array.from(e.target.files || []))
                }
              />

            </label>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-8 space-y-4">

                <h3 className="text-lg font-bold">
                  Selected Files
                </h3>

                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <FileText className="text-indigo-400 w-5 h-5" />
                      </div>

                      <div>
                        <h4 className="font-medium break-all">
                          {file.name}
                        </h4>

                        <p className="text-sm text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="w-10 h-10 rounded-xl hover:bg-red-500/10 flex items-center justify-center transition-all"
                    >
                      <X className="w-5 h-5 text-red-400" />
                    </button>

                  </div>
                ))}

              </div>
            )}

            {/* Message Box */}
            <div className="mt-8">

              <label className="block text-sm font-semibold mb-3 text-slate-300">
                Message / Instructions
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Write notes, instructions, explanations or anything for the student..."
                className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/40 outline-none rounded-3xl p-5 resize-none text-slate-200 placeholder:text-slate-500 transition-all"
              />

            </div>

            {/* Submit */}
            <div className="mt-10 flex justify-end">

              <button
                type="submit"
                className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all shadow-xl"
              >
                Send Materials
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default Material_Upload_Page