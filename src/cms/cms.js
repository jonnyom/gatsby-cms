import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import ProductsPagePreview from './preview-templates/ProductsPagePreview';
import ContactPagePreview from './preview-templates/ContactPagePreview';
import OnlineResourcesPagePreview from './preview-templates/OnlineResourcesPagePreview';
import CorporateWellbeingPagePreview from './preview-templates/CorporateWellbeingPagePreview';
import IndividualCoachingPagePreview from './preview-templates/IndividualCoachingPagePreview';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('coaching-tips', BlogPostPreview);
CMS.registerPreviewTemplate('products', ProductsPagePreview);
CMS.registerPreviewTemplate('contact', ContactPagePreview);
CMS.registerPreviewTemplate('online-resources', OnlineResourcesPagePreview);
CMS.registerPreviewTemplate(
  'individual-coaching',
  IndividualCoachingPagePreview
);
CMS.registerPreviewTemplate(
  'corporate-wellbeing',
  CorporateWellbeingPagePreview
);
