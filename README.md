<div align="center">
  <img src="./docs/modcom-Logo.png" alt="ModCom 10 Logo" width="300"/>

<h1>⚽️ ModCom 10 - WhoAmI 🧐</h1>

**The official Monorepo for the ModCom 10 - WhoAmI website.**

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Microsoft OAuth](https://img.shields.io/badge/Microsoft_OAuth-4285F4?style=for-the-badge&logo=microsoft&logoColor=white)](https://developers.google.com/identity/protocols/oauth2)
[![React Email](https://img.shields.io/badge/React_Email-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.email/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-30B980?style=for-the-badge)](https://nodemailer.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge)](https://biomejs.dev/)
[![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge)](https://typicode.github.io/husky/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefikproxy&logoColor=white)](https://traefik.io/traefik/)
[![Watchtower](https://img.shields.io/badge/Watchtower-4169E1?style=for-the-badge)](https://containrrr.dev/watchtower/)
[![GitHub Container Registry](https://img.shields.io/badge/GHCR-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/features/packages)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge)](https://better-auth.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![RustFS](https://img.shields.io/badge/RustFS-000000?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/rustfs/rustfs)
</div>

<h3>Stacks</h3>
<ul>
  <li>Node.js</li>
  <li>pnpm</li>
  <li>Turborepo</li>
  <li>NextJS</li>
  <li>Tailwind CSS</li>
  <li>Motion</li>
  <li>NestJS (base on Express.js)</li>
  <li>TypeScript</li>
  <li>Supabase (postgreSQL)</li>
  <li>Prisma</li>
  <li>JWT</li>
  <li>Docker</li>
  <li>Docker compose</li>
  <li>Better Auth</li>
  <li>RustFS (S3 Compatible Object Storage)</li>
  <li>GitHub Container Registry (GHCR)</li>
</ul>

<h3>Prepare Project</h3>
<ul>
  <li>Clone this repository : <code>git clone https://github.com/cpe-kmutt-student/modcom-10-whoami.git</code></li>
  <li>Install Dependencies : <code>pnpm install</code> (pnpm recommend)</li>
  <li>Config <code>.env</code> by rename or copy from <code>.env.example</code></li>
  <li>generate prisma client : <code>pnpm run generate</code></li>
</ul>


<h3>DB Migration</h3>
<ul>
  <li>Run Generate : <code>pnpm run generate</code></li>
  <li>Run Migration : <code>pnpm run db:migratedev</code></li>
  <li>Reset and Re-run Migration : <code>cd ./apps/api && pnpm exec prisma migrate reset</code></li>
</ul>


<h3>Commit rules</h3>
<ul>
  <li>feat – New feature</li>
  <li>fix – Bug fix</li>
  <li>perf – Performance improvement</li>
  <li>refactor – Code change without behavior change</li>
  <li>style – Code style only (no logic change)</li>
  <li>test – Add or update tests</li>
  <li>docs – Documentation only</li>
  <li>build – Build system or dependencies</li>
  <li>chore – Maintenance tasks</li>
  <li>ci – CI/CD configuration</li>
  <li>revert – Revert previous commit</li>
</ul>


<h3>Start Dev</h3>
<ul>
  <li>Run Dev Server : <code>pnpm run dev</code></li>
</ul>


<h3>Start Prod</h3>
<ul>
  <li>Run Prod Project on docker (Build from source) : <code>docker compose -f docker-compose.dev.yml up --build -d</code></li>
  <li>Run Prod Project on docker (Pull from GHCR (Recommended)) : <code>docker compose up -d</code></li>
</ul>

<h3>DB-Diagram (Final)</h3>
<a href="https://dbdiagram.io/d/ModeCom-WhoAmI-Final-6a64c606067336e1def26512">Open on DB Diagram</a> <br/>
<a href="https://dbdiagram.io/d/ModeCom-WhoAmI-Final-6a64c606067336e1def26512" target="_blank"></a>
<img src="./docs/ModeCom-WhoAmI-Final_F.png" alt="DB Diagram" />


<h3>API Flow Design (Prototype)</h3>
<p>No Design</p>


<h3>Reference & Endpoint & Port</h3>
<ul>
  <li>Web Server : <code>http://localhost:3000</code></li>
  <li>API Server : <code>http://localhost:3010</code></li>
  <li>Mentor Web Server : <code>http://localhost:3005</code></li>
  <li>Better-Auth : <code>http://localhost:3010/api/auth</code></li>
  <li>Docs (Better Auth) : <code>http://localhost:3010/api/auth/reference</code></li>
</ul>

<h3>Object Storage Server (S3 Complatible)</h3>
<ul>
  <li>Region : <code>us-east-1</code> dunt no y</li> 
  <li>Endpoint : <code>https://s3.aboutnon.in.th</code></li>
  <li>Console : <code>https://s3.aboutnon.in.th/rustfs/console</code></li>
</ul>


<h3>วิธีติดตั้ง Deps อื่นๆ</h3>

ติดตั้ง dependency เฉพาะ workspace ที่ต้องการ โดยใช้คำสั่งดังนี้ <br/>
<code>pnpm install [dep] --filter [workspace]</code><br/>
dep: ชื่อของ dependency ที่ต้องการติดตั้ง
workspace: ชื่อของ workspace ที่ต้องการติดตั้ง dependency เช่น `@repo/my-workspace`

<br/>

ติดตั้ง dependency ที่ root <br/>
<code>pnpm install [dep] -w</code><br/>
dep: ชื่อของ dependency ที่ต้องการติดตั้ง

<br/>

<h3>การเรียกใช้งาน Package</h3>
ในไฟล์ `package.json` ของแต่ละ workspace จะมีการกำหนดชื่อ package ไว้ที่ `name` ซึ่งสามารถเรียกใช้งานได้ดังนี้ <br/>
<code>import { functionName } from '@repo/my-workspace'</code>

<br/>

การ import เข้า dependencies ใน package.json ของ workspace อื่นๆ สามารถทำได้ดังนี้ <br/>
<code>pnpm add @repo/my-workspace --filter [workspace]</code><br/>
workspace: ชื่อของ workspace ที่ต้องการติดตั้ง dependency เช่น `@repo/my-workspace`


<h3>Cr.</h3>
<p>Made with 💚 by CPE39</p>