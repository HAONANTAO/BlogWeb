# Issue Tracker

The issue tracker is mainly used to generate issues and assign them to specific people and then has three states: open, in progress, and closed, and it has functions for adding, deleting, changing, querying, and visualisation.

Use NextJs, and TailWindCss with RadixUI to build the issue tracker web Application.

Prisma with Mysql as the database, functional with create, delete, edit

Also, use next-auth to do the Google account auth,

use Zod as the validation check,

use recharts as the visualization display

use react-hot-toast as the error alert

use hook-form to manage the form status

[![LinkedIn][linkedin-shield]][www.linkedin.com/in/haonan-tao-aaron]


<br />

<p align="center">
  <a href="https://github.com/shaojintian/Best_README_template/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>


</p>




## Content

- [Basic Develop environment](#Basic Develop environment)
  - [Set Up](#Set Up)
- [Files Catalog Contents](#Files Catalog Contents)
- [How to Use](#How to Use)
- [Deployment](#Deployment)
- [Skills](#Skills)
- [Contributor](#Contributor)
  - [Open Source](#Open Source)
- [Version Control](#Version Control)
- [Author](#Author)
- [External Links](#External Links)

### Basic Develop environment



###### **Set Up Steps**

Clone the repo

```sh
https://github.com/HAONANTAO/IssueTracker.git
```



### Files Catalog ContentsFiles Catalog Contents



```
issue-tracker
├── README.md
├── .env
├── .eslintrc.json
├── .gitignore
├── middleware.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── LICENSE
├── prisma
│  ├── migrations
│  ├── client.ts
│  ├── schema.prisma
├── app
│  ├── api
│  ├── ├── auth/[...nextauth]
│  ├── ├── ├── route.tsx

│  ├── ├── issues
│  ├── ├── ├── route.tsx
│  ├── ├── ├── [id]
│  ├── ├── ├── ├── edit
│  ├── ├── ├── ├── ├── route.tsx
│  ├── ├── ├── ├── route.tsx

│  ├── ├── users
│  ├── ├── ├── route.tsx

│  ├── auth
│  ├── ├── AuthOptions.ts
│  ├── ├── Provider.tsx

│  ├── components
│  ├── ├── DeletePageButoon.tsx
│  ├── ├── EditPageButton.tsx
│  ├── ├── ErrorMessage.tsx
│  ├── ├── IssueDetails.tsx
│  ├── ├── IssueForm.tsx
│  ├── ├── IssueFormSkeleton.tsx
│  ├── ├── Loading.ts
│  ├── ├── Pagination.tsx
│  ├── ├── SelfLink.tsx
│  ├── ├── Spinner.tsx
│  ├── ├── StatusBadge.tsx


│  ├── issues
│  ├── ├── [id]
│  ├── ├── ├── edit
│  ├── ├── ├── ├── loading.tsx
│  ├── ├── ├── ├── page.tsx
│  ├── ├── ├── AssigneeSelect.tsx
│  ├── ├── ├── loading.tsx
│  ├── ├── ├── page.tsx

│  ├── ├── list
│  ├── ├── ├── IssueStatusFilter.tsx
│  ├── ├── ├── IssueTable.tsx
│  ├── ├── IssueChart.tsx
│  ├── ├── NewIssueButton.tsx
│  ├── ├── loading.tsx
│  ├── ├── page.tsx

│  ├── newIssue
│  ├── ├── loading.tsx
│  ├── ├── page.tsx

│  ├── IssueSummary.tsx
│  ├── LatestIssues.tsx
│  ├── Navbar.tsx
│  ├── QueryClientProvidet.tsx
│  ├── ValidationSchema.tsx
│  ├── favicon.ico
│  ├── globals.css
│  ├── layout.tsx
│  ├── page.tsx
│  ├── theme-config.css


```

How to Use

```
npm i && npm run dev
```



### Deployment

Not Yet



### Skills

- NextJs as the fullstack framework

- TailWindCss 

- RadixUI

- prisma\

- axios

- next-auth

- react-hot-toast

- react-icons

- react-loading-skeleton

- recharts

- zod

  

### Contributor



#### Open Source

Contributing makes the open-source community a great place to learn, inspire and create. Any contribution you make is **very much appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Version Control

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。



### Author

HAONANTAO



### External Links


- [Code With Mosh](#https://members.codewithmosh.com/courses/nextjs-projects-issue-tracker/lectures/49642701)

  


<!-- links -->

