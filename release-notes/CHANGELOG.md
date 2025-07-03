# Missouri Uplands NAVHDA Website - Changelog

All notable changes to the Missouri Uplands NAVHDA website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Image compression for faster loading
- Remove unused image files
- Additional content improvements

## [1.5.0] - 2025-01-07

### Added
- PayPal integration with custom fields for contact information
- Payment success page (payment-success.html) for user confirmation
- Automatic contact info and payment details sent to PayPal
- Return and cancel URLs for better user experience
- Detailed item descriptions in PayPal transactions

### Changed
- Updated payment form to use PayPal's custom field parameters
- Enhanced payment button to collect and send all form data to PayPal
- Improved user flow with proper success/error handling

### Files Added
- `payment-success.html` - Payment confirmation page

### Files Modified
- `payment.html` - PayPal integration with custom fields

## [1.4.0] - 2025-01-07

### Added
- Git command line helper (`git-commands.bat`) for easy Git usage without GitHub Desktop
- Git usage guide (`GIT-USAGE.md`) with common workflows and examples
- Simplified Git workflow for non-technical users

### Changed
- Eliminated dependency on GitHub Desktop for basic Git operations
- Streamlined Git workflow with simple batch commands
- Added quick commit and push functionality

### Files Added
- `git-commands.bat` - Git command helper script
- `GIT-USAGE.md` - Git usage documentation

### Technical
- Configured Git path and aliases
- Created batch file with common Git operations
- Added error handling and user-friendly messages

## [1.3.0] - 2025-01-07

### Added
- Comprehensive security audit and documentation
- Security headers to all pages (CSP, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Security audit report (`notes/security-audit.md`)

### Changed
- Updated all external links to include `rel="noopener noreferrer"` for security
- Changed HTTP link to HTTPS for sundanace-gsp.com
- Enhanced security posture across all pages

### Security
- Implemented Content Security Policy (CSP) headers
- Added protection against clickjacking attacks
- Added protection against XSS attacks
- Added protection against MIME type sniffing
- Fixed potential window.opener exploitation vulnerabilities

### Files Modified
- `index.html` - Security headers and link security improvements
- `notes/security-audit.md` - Comprehensive security audit report

## [1.2.0] - 2025-01-07

### Added
- Complete 404 page redesign with modern layout
- Bird-hunting themed error message: "Sorry, we couldn't find any birds here!"
- GSP image (black_shorthair.jpg) added to 404 page
- Navigation bar with logo on 404 page
- Professional footer with social links on 404 page
- Project status tracking file (`notes/project-status.md`)
- Release notes and changelog system

### Changed
- Removed "Haters will say it's fake" message from 404 page
- Updated 404 page styling to match main site design
- Improved 404 page user experience with action buttons

### Technical
- Added Bootstrap JS dependencies to 404 page
- Implemented responsive design for 404 page
- Added hover effects and transitions

## [1.1.0] - 2025-01-07

### Added
- Meta descriptions to all pages for improved SEO
- Favicon (chapter logo) to all pages
- Consistent footer design across all pages
- Social media links (Facebook Events, NAVHDA National)
- "Last updated: January 2025" to all footers
- Improved alt text for all images
- Navigation links in footer for easy access

### Changed
- Enhanced accessibility with meaningful alt text
- Improved heading structure across all pages
- Updated button styles for consistency
- Professional branding throughout the site

### Fixed
- HTML structure issues in 404 page
- Missing DOCTYPE and language attributes
- Inconsistent styling across pages

### Files Modified
- `index.html` - Main homepage improvements
- `bird-orders.html` - SEO and footer additions
- `bird-vendors.html` - SEO and footer additions
- `pay.html` - SEO and footer additions
- `test/index.html` - SEO and footer additions
- `404.html` - Complete structure fix

## [1.0.0] - 2025-01-07

### Added
- Initial website cleanup and improvements
- SEO optimization foundation
- Accessibility improvements
- Consistent branding implementation
- Professional footer design
- Social media integration

### Technical
- Bootstrap 4 framework implementation
- Font Awesome icons integration
- Responsive design implementation
- Cross-browser compatibility

---

## Version History

### Version Numbering
- **Major.Minor.Patch** (e.g., 1.2.0)
- **Major**: Breaking changes or major redesigns
- **Minor**: New features or significant improvements
- **Patch**: Bug fixes and minor updates

### Release Types
- **Feature Release**: New functionality (minor version bump)
- **Bug Fix Release**: Bug fixes and improvements (patch version bump)
- **Major Release**: Significant changes or redesigns (major version bump)

---

## Contributing

When making changes to the website:

1. Update this changelog with your changes
2. Use the appropriate version number
3. Include all relevant details (Added, Changed, Fixed, Removed)
4. Update the project status file in `notes/project-status.md`

---

## Notes

- All dates are in YYYY-MM-DD format
- Changes are grouped by type (Added, Changed, Fixed, Removed)
- Technical changes are listed separately when relevant
- File modifications are tracked for reference 