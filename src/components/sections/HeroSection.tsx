import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  formatDeadline,
  formatINR,
  type Competition,
} from '@/data/competitions';
import { brand } from '@/data/brand';

interface Props {
  competition: Competition;
}

export function HeroSection({ competition }: Props) {
  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.pexels.com/videos/2675516/free-video-2675516.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/2675516/2675516-sd_960_540_24fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/80" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-white/85"
          >
            <Sparkles className="size-3" />
            {competition.season} \u00b7 Now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-white text-balance mt-6 text-[clamp(2.75rem,7vw,6rem)] leading-[0.95]"
          >
            Your lens.
            <br />
            <em className="not-italic">
              <span className="italic">Your stage.</span>
            </em>
            <br />
            Your win.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/85 text-pretty"
          >
            India\u2019s first engagement-based photography competition. No
            judging panels. No backroom decisions. Post a video, let the
            internet vote with its attention, take home {formatINR(competition.prizeINR)}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 h-12 text-base font-medium"
            >
              <Link to={`/competitions/${competition.slug}`}>
                View competition
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 h-12 text-base font-medium bg-white/5 backdrop-blur border-white/30 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/#register">
                Register for {formatINR(competition.entryFeeINR)}
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pb-10 grid grid-cols-3 gap-6 max-w-2xl text-white/85"
        >
          <Stat label="Season" value={competition.season.replace('Season ', 'S')} />
          <Stat label="Prize pool" value={formatINR(competition.prizeINR)} />
          <Stat label="Entry" value={formatINR(competition.entryFeeINR)} />
        </motion.div>
      </div>

      <div className="sr-only">{brand.tagline}</div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        Deadline {formatDeadline(competition.deadline)}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/20 pt-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
        {label}
      </div>
      <div className="font-display text-2xl md:text-3xl mt-1">{value}</div>
    </div>
  );
}
