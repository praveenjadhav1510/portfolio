"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FileText, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import TypingAnimation from "@/components/TypingAnimation"
import Navigation from "@/components/Navigation"
import BackToTop from "@/components/BackToTop"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export default function HomePage() {
  const [showJarvis, setShowJarvis] = useState(false)
  const { data, loading } = usePortfolioData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading portfolio data</p>
      </div>
    )
  }

  const getTechIcon = (skillName: string) => {
    const name = skillName.toLowerCase()

    if (name.includes("react")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#61DAFB">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z" />
        </svg>
      )
    }

    if (name.includes("javascript")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#F7DF1E">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056zm-8.276 8.563l-6.214-4.163c-.213-.14-.213-.389 0-.529l6.214-4.163c.213-.14.453-.14.666 0l6.214 4.163c.213.14.213.389 0 .529l-6.214 4.163c-.213.14-.453.14-.666 0z" />
        </svg>
      )
    }

    if (name.includes("node")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#339933">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      )
    }

    if (name.includes("python")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#3776AB">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.09-.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.01 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41.08-.41-.23-.33-.33-.23-.41-.08-.41-.08z" />
        </svg>
      )
    }

    if (name.includes("html")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#E34F26">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
        </svg>
      )
    }

    if (name.includes("css")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#1572B6">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
        </svg>
      )
    }

    if (name.includes("java") && !name.includes("javascript")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#ED8B00">
          <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
        </svg>
      )
    }

    if (name.includes("mongodb")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#47A248">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
        </svg>
      )
    }

    if (name.includes("mysql")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#4479A1">
          <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.002c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.72.384 3.564.422 5.53zM9.294 18.695h-.927c-.042-1.966-.184-3.81-.427-5.53h.919c.18 1.72.315 3.564.435 5.53zM11.563 18.695h-.927c-.042-1.966-.184-3.81-.427-5.53h.919c.18 1.72.315 3.564.435 5.53zM14.405 18.695h-.927c-.042-1.966-.184-3.81-.427-5.53h.919c.18 1.72.315 3.564.435 5.53zM17.248 18.695h-.927c-.042-1.966-.184-3.81-.427-5.53h.919c.18 1.72.315 3.564.435 5.53zM19.07 18.695h-.927c-.042-1.966-.184-3.81-.427-5.53h.919c.18 1.72.315 3.564.435 5.53z" />
        </svg>
      )
    }

    if (name.includes("firebase")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#FFCA28">
          <path d="M5.803 21.066l2.756-4.756-1.754-3.34L4.15 16.66l1.653 4.406zm7.194.934L5.803 21.066 4.15 16.66l2.649-3.69L12.997 22zm6.844-1.934L12.997 22l6.047-8.34-1.203-2.206-6.844 11.546zm0-11.546L12.997 22 6.799 13.97l6.198-11.04 6.844 11.546z" />
        </svg>
      )
    }

    if (name.includes("git") && !name.includes("github")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#F05032">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.6-.719.721-1.881.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
        </svg>
      )
    }

    if (name.includes("github")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#181717">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    }

    if (name.includes("blender")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#F5792A">
          <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 012.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 01-2.374.938 3.393 3.393 0 01-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 01-1.593 1.064 10.386 10.386 0 01-.798.31 9.454 9.454 0 01-.806.2 4.289 4.289 0 01-2.065-.21 2.031 2.031 0 01-1.152-1.09A2.104 2.104 0 01.876 15.3a2.12 2.12 0 01.62-1.191A2.361 2.361 0 012.59 13.6c.43-.119.922-.139 1.4-.12.394.015 1.009.048 1.509.048.748 0 1.36-.033 1.851-.048M24 12.51c-.046.8-.438 1.506-1.03 2.005a3.424 3.424 0 01-2.212.791c-.85 0-1.631-.301-2.211-.791-.592-.499-.983-1.205-1.028-2.005-.045-.822.285-1.585.865-2.152a3.389 3.389 0 012.374-.938 3.393 3.393 0 012.376.938c.58.567.91 1.33.865 2.152M16.65 9.169c-.006-.314-.106-.922-.256-1.398a7.372 7.372 0 011.593-1.064c.307-.168.6-.319.798-.31.199-.037.398-.075.806-.2a4.289 4.289 0 012.065.21 2.031 2.031 0 011.152 1.09c.27.47.335.998.186 1.503a2.12 2.12 0 01-.62 1.191 2.361 2.361 0 01-1.094.508c-.43.119-.922.139-1.4.12-.394-.015-1.009-.048-1.509-.048-.748 0-1.36.033-1.851.048" />
        </svg>
      )
    }

    if (name.includes("figma")) {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#F24E1E">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.02 3.019 3.02h3.117v-6.038H8.148zm7.704 0c-2.476 0-4.49 2.015-4.49 4.49s2.014 4.49 4.49 4.49 4.49-2.015 4.49-4.49-2.014-4.49-4.49-4.49zm0 7.509c-1.665 0-3.019-1.355-3.019-3.019s1.355-3.019 3.019-3.019 3.019 1.354 3.019 3.019-1.354 3.019-3.019 3.019zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019zm0 7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019z" />
        </svg>
      )
    }

    // Default fallback icon
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToTop />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Image
                src={data.profile.profileImage || "/placeholder.svg"}
                alt={data.profile.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-8 border-4 border-primary/20"
              />

              <div className="mb-4">
                <Button variant="outline" onClick={() => setShowJarvis(!showJarvis)} className="mb-4">
                  Switch to {showJarvis ? data.profile.name : data.profile.nickname}
                </Button>

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {showJarvis ? data.profile.nickname : data.profile.name}
                </h1>
              </div>

              <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-16">
                <TypingAnimation text={data.profile.tagline} speed={80} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg">
                <Link href="/resume">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Projects
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Overview</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.about.intro}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{(data.skills || []).length}+</div>
                    <h3 className="text-xl font-semibold mb-2">Technologies</h3>
                    <p className="text-muted-foreground">Proficient in modern web development technologies</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{(data.projects || []).length}+</div>
                    <h3 className="text-xl font-semibold mb-2">Projects</h3>
                    <p className="text-muted-foreground">Completed projects showcasing various skills</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">87.66%</div>
                    <h3 className="text-xl font-semibold mb-2">BCA Grade</h3>
                    <p className="text-muted-foreground">Currently pursuing Bachelor of Computer Applications</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Preview */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Technologies</h2>
              <p className="text-xl text-muted-foreground">Technologies I work with daily</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {(data.skills || []).slice(0, 12).map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center p-4 hover:shadow-md transition-all">
                    <CardContent className="p-2">
                      <div className="text-2xl mb-2 flex justify-center">{getTechIcon(skill.name)}</div>
                      <h3 className="font-semibold text-sm">{skill.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button asChild variant="outline" size="lg">
                <Link href="/skills">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View All Skills
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground">Some of my recent work</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {(data.projects || []).slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(project.technologies || []).slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            View Demo
                          </a>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button asChild size="lg">
                <Link href="/projects">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View All Projects
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
