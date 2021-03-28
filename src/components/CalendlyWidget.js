import React from 'react';
import { InlineWidget } from 'react-calendly';

const CalendlyWidget = ({ widgetUrl, previewMode }) => {
  return (
    <>
      {previewMode ? (
        <div>
          Calendly Widget Cannot be shown in preview mode. Updating the URL here
          will update the calendly widget in production. Calendly URL is:{' '}
          {widgetUrl}
        </div>
      ) : (
        <InlineWidget
          url={widgetUrl || ''}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '25adaf'
          }}
        />
      )}
    </>
  );
};

export default CalendlyWidget;
