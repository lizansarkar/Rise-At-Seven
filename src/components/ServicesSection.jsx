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
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1200",
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
    <section className="bg-[#efeeec] py-24 px-5 md:px-10 lg:px-16 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-black/10">
        <div className="flex items-center gap-5">
          <h2
            className="
              text-[64px]
              md:text-[120px]
              leading-[0.9]
              font-bold
              tracking-[-0.06em]
              text-[#111111]
            "
          >
            Our Services
          </h2>

          <div class="service-card left">
            <img
              src="image-1.jpg"
              alt="Search & Growth Strategy"
              class="service-image"
            />

            <div class="service-content">
              <h3>Search & Growth Strategy</h3>
              <span class="arrow">↗</span>
            </div>
          </div>
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
