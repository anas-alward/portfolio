import { motion } from 'framer-motion'
import HeroSection from './sections/hero'
import TabsSection from './sections/tabs'
import Footer from './sections/footer'

const MainPage = ({ isReady }: { isReady: boolean }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center ">
      <motion.div
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2
            }
          }
        }}
        className="px-0 w-[90%] pt-20 pb-25 tablet:py-25  tablet:max-w-175 flex flex-col gap-20"
      >

        {/* Profile section */}
        <HeroSection />

        {/* Tabs section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <TabsSection />
        </motion.div>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  )
}

export default MainPage

