<!-- # Delta Labs Documentation Structure -->

> **Guide for creating professional online documentation**

---

## 📁 Folder Structure (Current)

> **Source of truth**: This tree matches the live docs. See also [Welcome](/docs/intro) for quick start.

```
docs/
├── intro.md                           # Entry point
├── separation-guide.md                # Design vs Coding — what goes where
├── structure-guide.md                 # This guide
│
├── 01-overview/                       # PROJECT OVERVIEW
│   ├── overview.md                   # Section hub
│   └── project-analysis.md           # Complete project breakdown
│
├── 02-design-system/                 # DESIGN SYSTEM (UI/UX)
│   ├── design-intro.md               # Section hub
│   ├── design-system.md              # Component library, atomic design, layouts
│   ├── design-tokens.md              # Colors, typography, spacing, tokens
│   └── api-standards.md              # REST, auth, DataContext, rate limiting
│
├── 03-coding-standards/              # CODING STANDARDS (Code Quality)
│   ├── standards-intro.md            # Section hub
│   └── coding-standards.md          # Naming, TypeScript, React, structure, etc.
│
├── 04-templates/                     # CODE TEMPLATES
│   ├── templates-intro.md            # Section hub
│   └── templates.md                  # Component, context, hook, type templates
│
├── 05-architecture/                  # ARCHITECTURE
│   ├── architecture-intro.md        # Section hub (points to single doc)
│   └── full-system-architecture.md  # Delta Labs System Architecture — single source of truth
│
├── 06-api-reference/                 # API REFERENCE
│   ├── api-reference-intro.md        # Section hub
│   └── api-reference.md              # Endpoints, auth, rate limits, modules
│
└── 07-best-practices/                # BEST PRACTICES
    ├── best-practices-intro.md       # Section hub
    └── best-practices.md             # Frontend, backend, security, testing
```

---

## 🎯 Document Purposes

### 01-overview/
**Purpose**: High-level project understanding  
**Audience**: All team members, new developers  
**Content**: Architecture, modules, technology stack

### 02-design-system/
**Purpose**: Visual design and component standards  
**Audience**: Designers, Frontend developers  
**Content**: UI patterns, layouts, component structure, variants  
**Focus**: WHAT to build and HOW it should look

### 03-coding-standards/
**Purpose**: Code quality and conventions  
**Audience**: All developers  
**Content**: Naming, TypeScript, React patterns, file organization  
**Focus**: HOW to write code properly

### 04-templates/
**Purpose**: Quick reference and boilerplate  
**Audience**: All developers  
**Content**: Copy-paste templates, examples  
**Focus**: Speed up development

### 05-architecture/
**Purpose**: System architecture (backend, data, AI; full system)  
**Audience**: Backend, data, product, operations  
**Content**: Backend/Database/AI design; full system (scale, security, ops)  
**Focus**: Single source of truth for architecture

### 06-api-reference/
**Purpose**: Backend API contract  
**Audience**: Backend and frontend developers  
**Content**: Endpoints, auth, rate limits, module types  
**Focus**: Implement and consume APIs correctly

### 07-best-practices/
**Purpose**: Cross-cutting patterns  
**Audience**: All developers  
**Content**: Frontend/backend/security/testing, code style  
**Focus**: Complements Coding Standards and Design System

---

## 🔗 Document Relationships

### No Overlap Rule

Each document has ONE clear purpose:

| Document Type | Covers | Does NOT Cover |
|---------------|--------|----------------|
| **Overview** | Project structure, modules, tech stack | Implementation details |
| **Design System** | Component structure, tokens, layouts, API standards | Code syntax, naming, TypeScript |
| **Coding Standards** | Code quality, naming, TypeScript, file organization | UI design, component structure |
| **Templates** | Ready-to-use code | Explanations, theory |
| **Architecture** | AI routing, layers, data flow | Specific endpoints, code patterns |
| **API Reference** | Endpoints, auth, rate limits, module types | Conventions, DataContext patterns |
| **Best Practices** | Frontend/backend/security/testing patterns | Syntax, file structure (see Coding Standards) |

---

## 📝 Creating Online Documentation

### Recommended Platforms

1. **GitBook** - Best for structured docs
2. **Docusaurus** - React-based, customizable
3. **VuePress** - Vue-based, simple
4. **MkDocs** - Python-based, Material theme
5. **Notion** - Quick setup, collaborative

### Migration Steps

1. **Choose Platform**
   - Consider: Team size, tech stack, hosting needs
   - Recommendation: Docusaurus (React-based, fits your stack)

2. **Setup Structure**
   ```
   website/
   ├── docs/
   │   ├── overview/
   │   ├── design-system/
   │   ├── coding-standards/
   │   └── templates/
   ├── sidebars.js
   └── docusaurus.config.js
   ```

3. **Configure Navigation**
   ```javascript
   // sidebars.js
   module.exports = {
     docs: [
       {
         type: 'category',
         label: 'Overview',
         items: ['overview/project-analysis', 'overview/getting-started'],
       },
       {
         type: 'category',
         label: 'Design System',
         items: [
           'design-system/overview',
           'design-system/atomic-design',
           'design-system/component-library',
           'design-system/layouts',
           'design-system/variants',
         ],
       },
       // ... more categories
     ],
   };
   ```

4. **Add Search**
   - Enable Algolia DocSearch
   - Or use built-in search

5. **Deploy**
   - GitHub Pages
   - Netlify
   - Vercel
   - Company internal server

---

## 🎨 Styling Recommendations

### For Online Docs

1. **Use Syntax Highlighting**
   - Prism.js or Highlight.js
   - Language: TypeScript, TSX

2. **Add Interactive Examples**
   - CodeSandbox embeds
   - Live code editors

3. **Include Visuals**
   - Component screenshots
   - Architecture diagrams
   - Flow charts

4. **Navigation**
   - Sidebar navigation
   - Breadcrumbs
   - Search functionality
   - Previous/Next buttons

---

## 📊 Content Organization Tips

### 1. Progressive Disclosure
Start simple, add complexity gradually:
- Overview → Details → Advanced

### 2. Consistent Structure
Every document should have:
- Title
- Description
- Table of Contents
- Examples
- Related Links

### 3. Cross-Referencing
Link related documents:
```markdown
See also: [Design System](/docs/design-system/design-system)
```

### 4. Version Control
- Track changes in git
- Version numbers in headers
- Changelog section

---

## 🚀 Quick Setup (Docusaurus)

```bash
# Install Docusaurus
npx create-docusaurus@latest delta-labs-docs classic

# Copy documentation
cp -r docs/* delta-labs-docs/docs/

# Start dev server
cd delta-labs-docs
npm start

# Build for production
npm run build

# Deploy
npm run deploy
```

---

## 📱 Mobile-Friendly

Ensure documentation is responsive:
- Mobile navigation
- Readable font sizes
- Touch-friendly buttons
- Collapsible sections

---

## 🔍 Search Optimization

### Internal Search
- Index all documents
- Search by title, content, tags
- Keyboard shortcuts (Ctrl+K)

### SEO (if public)
- Meta descriptions
- Proper headings (H1, H2, H3)
- Alt text for images
- Sitemap

---

## 📈 Analytics (Optional)

Track documentation usage:
- Google Analytics
- Page views
- Search queries
- User flow

---

## 🔐 Access Control (if needed)

For internal docs:
- Authentication required
- Role-based access
- VPN requirement
- IP whitelist

---

## 📞 Support

**Questions about structure**: [Contact]  
**Technical issues**: [Contact]  
**Content updates**: Submit PR

---

**Last Updated**: 2026-01-21  
**Maintained By**: Delta Labs Development Team
