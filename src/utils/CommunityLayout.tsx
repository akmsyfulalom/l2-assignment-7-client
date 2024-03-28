/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CommunityLayout({children, className=""}: {children: any, className: any}) {
    return (
      <div className={`w-full h-full inline-block z-0 bg-light  dark:bg-dark p-6  lg:p-16 md:p-12 sm:p-8 ${className}`}>
        {children}
      </div>
    )
  }
  