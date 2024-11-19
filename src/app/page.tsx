'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import JSZip from 'jszip'

// Simulated AI-generated branding package
const generateBrandingPackage = (businessInfo) => {
  return {
    logo: '/placeholder.svg?height=100&width=200',
    colorPalette: ['#FF5733', '#33FF57', '#3357FF'],
    fonts: {
      primary: 'Arial',
      secondary: 'Helvetica'
    },
    brandVoice: 'Professional and friendly',
    tagline: `Innovating ${businessInfo.sector} with ${businessInfo.name}`,
    socialMediaTemplates: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300'
    ]
  }
}

// Simulated file generation
const generateFiles = (brandingPackage) => {
  return {
    'logo.svg': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzMiPkxvZ288L3RleHQ+PC9zdmc+',
    'brand_guidelines.pdf': 'data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDENCi9LaWRzIFsgNCAwIFIgXQ0KPj4NCmVuZG9iag0KDQo0IDAgb2JqDQo8PA0KL1R5cGUgL1BhZ2UNCi9QYXJlbnQgMyAwIFINCi9SZXNvdXJjZXMgPDwNCi9Gb250IDw8DQovRjEgOSAwIFIgDQo+Pg0KL1Byb2NTZXQgOCAwIFINCj4+DQovTWVkaWFCb3ggWzAgMCA2MTIuMDAwMCA3OTIuMDAwMF0NCi9Db250ZW50cyA1IDAgUg0KPj4NCmVuZG9iag0KDQo1IDAgb2JqDQo8PCAvTGVuZ3RoIDEwNzQgPj4NCnN0cmVhbQ0KMiB3DQowIEcNCkJUDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTc5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgdw0KMCBHDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNzA0LjEyMDAgVGQNCiggU2ltcGxlIFBERiBGaWxlIDIgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NjQuNzA0MCBUZA0KKCAuLi5jb250aW51ZWQgZnJvbSBwYWdlIDEuIFlldCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjUyLjc1MjAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gRXZlbiBtb3JlLiBDb250aW51ZWQgb24gcGFnZSAzIC4uLikgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBu',
    '': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
  }
}

export default function Home() {
  <style jsx global>{`
    body {
      color: black;
    }
  `}</style>
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    type: '',
    overview: '',
    sector: '',
    colorPreference: '',
  })
  const [brandingPackage, setBrandingPackage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBusinessInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const generatedPackage = generateBrandingPackage(businessInfo)
    setBrandingPackage(generatedPackage)
    setIsGenerating(false)
    setCurrentStep(1)
  }

  const handleDownload = async () => {
    setDownloadReady(false)
    
    // Simulate file generation time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const files = generateFiles(brandingPackage)
    
    // Create a zip file containing all generated files
    const zip = new JSZip()
    Object.entries(files).forEach(([filename, data]) => {
      zip.file(filename, data.split(',')[1], {base64: true})
    })
    
    const content = await zip.generateAsync({type: "blob"})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(content)
    link.download = 'branding_package.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setDownloadReady(true)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={businessInfo.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                name="type"
                id="type"
                value={businessInfo.type}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="overview" className="block text-sm font-medium text-gray-700">Business Overview</label>
              <textarea
                name="overview"
                id="overview"
                value={businessInfo.overview}
                onChange={handleInputChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Business Sector</label>
              <input
                type="text"
                name="sector"
                id="sector"
                value={businessInfo.sector}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="colorPreference" className="block text-sm font-medium text-gray-700">Color Preference</label>
              <input
                type="text"
                name="colorPreference"
                id="colorPreference"
                value={businessInfo.colorPreference}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g., Blue, Red, Green"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Generating...
                  </>
                ) : (
                  'Generate Branding Package'
                )}
              </button>
            </div>
          </form>
        )
      case 1:
        return (
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
            <div>
              <h3 className="font-medium">Logo</h3>
              <img src={brandingPackage.logo} alt="Generated Logo" className="mt-2 border border-gray-200 rounded" />
            </div>
            <div>
              <h3 className="font-medium">Color Palette</h3>
              <div className="flex mt-2 space-x-2">
                {brandingPackage.colorPalette.map((color, index) => (
                  <div key={index} className="w-10 h-10 rounded" style={{backgroundColor: color}}></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium">Typography</h3>
              <p>Primary Font: {brandingPackage.fonts.primary}</p>
              <p>Secondary Font: {brandingPackage.fonts.secondary}</p>
            </div>
            <div>
              <h3 className="font-medium">Brand Voice</h3>
              <p>{brandingPackage.brandVoice}</p>
            </div>
            <div>
              <h3 className="font-medium">Tagline</h3>
              <p>{brandingPackage.tagline}</p>
            </div>
            <div>
              <h3 className="font-medium">Social Media Templates</h3>
              <div className="flex mt-2 space-x-2">
                {brandingPackage.socialMediaTemplates.map((template, index) => (
                  <img key={index} src={template} alt={`Social Media Template ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            </div>
            <button
              onClick={handleDownload}
              disabled={!downloadReady}
              className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {downloadReady ? (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Files
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Preparing Download...
                </>
              )}
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 mainC">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">AI-Powered Branding Solution</h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Fill out the form, and our AI will generate a complete branding package for you!
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep(currentStep)}
              </motion.div>
            </AnimatePresence>
          </div>
          {brandingPackage && (
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === 1}
                  className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}