import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import ProductsPagePreview from './preview-templates/ProductsPagePreview';
import ContactPagePreview from './preview-templates/ContactPagePreview';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('coaching-tips', BlogPostPreview);
CMS.registerPreviewTemplate('products', ProductsPagePreview);
CMS.registerPreviewTemplate('contact', ContactPagePreview);
