import React from "react";
import FlowingMenu from "./FlowingMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    text: "Digital PR",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200",
    link: "#",
  },
  {
    text: "Organic Social & Content",
    image:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200",
    link: "#",
  },
  {
    text: "Search & Growth Strategy",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    link: "#",
  },
  {
    text: "Content Experience",
    image:
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200",
    link: "#",
  },
  {
    text: "Data & Insights",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-hand-gesture-likes-cooperation-business-team-photograph-with-picture-business-team-image_788590.jpg",
    link: "#",
  },
  {
    text: "Onsite SEO",
    image:
      "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=1200",
    link: "#",
  },
];

function ServicesSection() {
  return (
    <section className="py-10 px-5 md:px-10 lg:px-16 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-5 border-b border-black/10">
        <div className="flex items-center">
          <h2
            className="text-[64px] md:text-[100px] font-medium text-neutral flex items-center gap-2 md:gap-3">
            <span>Our</span>
            <div className="inline-block w-15 h-15 md:w-25 md:h-25 rounded-[0.5rem] md:rounded-[1rem] overflow-hidden mt-2">
              <img
                src="https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5079.JPG?w=200&h=200&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750944462&s=5eb651d549739cde26429958911743ea"
                alt="Search & Growth Strategy"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span>Services</span>
          </h2>
        </div>

        {/* Button */}
        <button className="btn-sweep">
          <div className="sweep-text">
            <span className="flex items-center gap-2">
              Explore Our Work <span className="text-xs">↗</span>
            </span>

            <span className="flex items-center gap-2">
              Explore Our Work <span className="text-xs">↗</span>
            </span>
          </div>
        </button>
      </div>

      {/* Menu */}
      <FlowingMenu items={services} />
    </section>
  );
}

export default ServicesSection;
