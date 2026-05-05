import React from 'react'

const Link = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const useNavigation = jest.fn().mockReturnValue({ setOptions: jest.fn() })
const useLocalSearchParams = jest.fn().mockReturnValue({ id: '1' })
const usePathname = jest.fn().mockReturnValue('/')
const useRouter = jest
  .fn()
  .mockReturnValue({ back: jest.fn(), push: jest.fn(), replace: jest.fn() })

export { Link, useLocalSearchParams, useNavigation, usePathname, useRouter }
