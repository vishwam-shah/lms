'use client';
import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: React.FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['0']));

  // Toggle section visibility
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  let videoSections: any[] = [];
  let videoCount = 0;
  let videoDuration = 0;

  if (data && data.length > 0) {
    data.forEach((item: any) => {
      if (item.courseData) {
        videoDuration += item.videoLength;
        videoCount++;
        videoSections.push(item);
      }
    });
  }

  const videoCountText = videoCount < 2 ? `${videoCount} lecture` : `${videoCount} lectures`;
  const videoDurationText = `${Math.floor(videoDuration / 60)}:${Math.floor(videoDuration % 60)
    .toString()
    .padStart(2, '0')}`;

  return (
    <div className="mt-[15px] w-full">
      {!isDemo && (
        <div className="w-full flex items-center justify-between p-4 bg-[#f7f9fa] dark:bg-[#1e293b] rounded-t-lg">
          <h4 className="text-md text-black dark:text-white">
            {videoCountText} • {videoDurationText}
          </h4>
        </div>
      )}

      <div className="w-full">
        {data &&
          data.map((section: any, sectionIndex: number) => {
            const isSectionVisible = visibleSections.has(sectionIndex.toString());
            
            return (
              <div className="border-b border-[#ffffff1c]" key={sectionIndex}>
                <div
                  className="w-full flex items-center justify-between p-4 cursor-pointer bg-[#f7f9fa] dark:bg-[#1e293b] hover:bg-[#e2e8f0] dark:hover:bg-[#334155] transition-colors"
                  onClick={() => toggleSection(sectionIndex.toString())}
                >
                  <h4 className="text-lg font-medium text-black dark:text-white">
                    {section.title}
                  </h4>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                      {section.courseData ? '1 lecture' : '0 lectures'}
                    </span>
                    {isSectionVisible ? (
                      <BsChevronUp className="text-black dark:text-white" />
                    ) : (
                      <BsChevronDown className="text-black dark:text-white" />
                    )}
                  </div>
                </div>

                {isSectionVisible && section.courseData && (
                  <div className="w-full">
                    <div
                      className={`w-full flex items-center p-4 cursor-pointer ${
                        activeVideo === sectionIndex
                          ? 'bg-gradient-to-r from-[#56d8e4] to-[#9cc5ff] text-white'
                          : 'bg-white dark:bg-[#0f172a] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b]'
                      } transition-all duration-200`}
                      onClick={() => {
                        if (!isDemo) {
                          setActiveVideo(sectionIndex);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <MdOutlineOndemandVideo
                          size={20}
                          className={`mr-3 ${
                            activeVideo === sectionIndex
                              ? 'text-white'
                              : 'text-[#37a39a]'
                          }`}
                        />
                        <h1
                          className={`text-[18px] inline-block break-words ${
                            activeVideo === sectionIndex
                              ? 'text-white'
                              : 'text-black dark:text-white'
                          }`}
                        >
                          {section.title}
                        </h1>
                      </div>
                      <h5
                        className={`pl-3 text-sm ${
                          activeVideo === sectionIndex
                            ? 'text-white'
                            : 'text-black dark:text-white'
                        }`}
                      >
                        {section.videoLength > 60
                          ? `${Math.floor(section.videoLength / 60)}:${Math.floor(section.videoLength % 60)
                              .toString()
                              .padStart(2, '0')}`
                          : `${section.videoLength}s`}
                      </h5>
                    </div>

                    {section.links.map((item: any, linkIndex: number) => (
                      <div className="w-full inline-block p-4 pl-8" key={linkIndex}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#37a39a] hover:text-[#2e8b87] text-[16px] hover:underline"
                        >
                          <span className="mr-2">🔗</span>
                          {item.title}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseContentList;
