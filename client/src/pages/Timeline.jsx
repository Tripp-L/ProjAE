import React, { useEffect, useRef } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import { useNavigate } from 'react-router-dom';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import './Timeline.css';

const TimelineComponent = () => {
  const timelineRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = timelineRef.current;

    const items = new DataSet([
      {
        id: 1,
        content: `
          <div class="timeline-item">
            <img src="/images/civilization1.jpg" class="timeline-img" alt="Civilization 1" />
            <div class="timeline-content">
              <a href="/civilization/1" class="timeline-link">Civilization 1</a>
              <p class="timeline-description">Region: Region 1</p>
              <p class="timeline-description">Brief description of Civilization 1.</p>
            </div>
          </div>
        `,
        start: '-20000-01-01' // 20,000 BC
      },
      {
        id: 2,
        content: `
          <div class="timeline-item">
            <img src="/images/civilization2.jpg" class="timeline-img" alt="Civilization 2" />
            <div class="timeline-content">
              <a href="/civilization/2" class="timeline-link">Civilization 2</a>
              <p class="timeline-description">Region: Region 2</p>
              <p class="timeline-description">Brief description of Civilization 2.</p>
            </div>
          </div>
        `,
        start: '2024-06-02' // Example date
      },
      // Add more items here
    ]);

    const options = {
      editable: false,
      stack: false,
      zoomable: true,
      horizontalScroll: true,
      min: new Date(-20000, 0, 1), // Start at 20,000 BC
      max: new Date(2025, 0, 1), // End at 2025 AD
      margin: {
        item: 20,
        axis: 40,
      },
      width: '100%',
      height: '400px',
      showCurrentTime: false,
      zoomMin: 1000 * 60 * 60 * 24 * 30 * 12, // One year in milliseconds
      zoomMax: 1000 * 60 * 60 * 24 * 30 * 12 * 20000, // 20,000 years in milliseconds
      tooltip: {
        followMouse: true,
      },
      onClick: (props) => {
        if (props.item) {
          const item = items.get(props.item);
          const link = item.content.match(/href="([^"]*)"/)[1];
          navigate(link);
        }
      }
    };

    const timeline = new Timeline(container, items, options);

    return () => {
      timeline.destroy();
    };
  }, [navigate]);

  return <div ref={timelineRef} className="timeline-container"></div>;
};

export default TimelineComponent;
