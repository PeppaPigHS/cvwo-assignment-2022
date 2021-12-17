import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="text-center mx-auto px-4 py-8 sm:px-6 lg:px-8 md:flex md:item-centers md:justify-between md:text-left">
        <p className="text-base text-gray-400">
          &copy; 2021 Pontakorn Prasertsuk
        </p>
        <span className="text-xs text-gray-400 md:justify-start">
          The source code for this website is available on{' '}
          <a
            href="https://github.com/PeppaPigHS/cvwo-assignment-2022"
            target="_blank"
            className="inline-flex font-medium text-gray-700 hover:underline"
          >
            Github
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
