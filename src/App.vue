<template>
  <!-- 顶层 RouterView 根据 URL 切换公共布局、登录页和管理后台。 -->
  <RouterView />
</template>

<style>
@import './assets/main.css';

:root {
  --ink: #172b2b;
  --muted: #657878;
  --paper: #f3f6f1;
  --card: #fffefa;
  --line: #dce6df;
  --accent: #16866a;
  --accent-deep: #0d614e;
  --warm: #eab06c;
  --el-color-primary: #16866a;
  --el-color-primary-light-3: #57a88e;
  --el-color-primary-light-5: #89c1ae;
  --el-color-primary-light-7: #b8d9cc;
  --el-color-primary-light-8: #d1e6dc;
  --el-color-primary-light-9: #e8f2ed;
  --el-color-primary-dark-2: #0d614e;
  --el-border-radius-base: 4px;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

* { box-sizing: border-box; margin: 0; }
body { display: block; min-width: 320px; color: var(--ink); background: var(--paper); }
#app { display: block; width: 100%; max-width: none; min-height: 100vh; margin: 0; padding: 0; }
a { color: inherit; }
button, input, textarea { font: inherit; }
.app-root { min-height: 100vh; background: radial-gradient(circle at 80% 0%, #e5f0e7 0, transparent 32rem), var(--paper); transition: .35s; }
.app-root.dark { --ink: #e5eee8; --muted: #a5b9ad; --paper: #12201d; --card: #1a2d28; --line: #365046; --accent: #7ed2ae; --accent-deep: #b9ead0; --warm: #e2b26d; background: radial-gradient(circle at 80% 0%, #25453a 0, transparent 32rem), var(--paper); }
.page-shell { width: min(1080px, calc(100% - 40px)); margin: auto; }
.site-header { min-height: 78px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); }
.brand { display: flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: .04em; white-space: nowrap; }
.brand-mark { display: grid; place-items: center; width: 32px; height: 32px; color: white; background: var(--accent); border-radius: 50% 50% 50% 4px; }
.site-nav { display: flex; flex-shrink: 0; gap: 22px; color: var(--muted); font-size: 13px; }
.site-nav a { white-space: nowrap; }
.site-nav a, .site-footer a { text-decoration: none; }
.site-nav a:hover, .site-footer a:hover { color: var(--accent); }
.theme-toggle, .mini { flex-shrink: 0; border: 1px solid var(--accent); border-radius: 4px; color: var(--accent-deep); background: transparent; padding: 7px 12px; cursor: pointer; font-size: 12px; white-space: nowrap; }
.page-content { display: flex; flex-direction: column; gap: 16px; padding: 54px 0 72px; }
.intro-banner { padding: 30px 0 24px; }
.eyebrow { margin-bottom: 9px; color: var(--accent); font-size: 10px; font-weight: 800; letter-spacing: .2em; }
.intro-banner h1 { max-width: 700px; font-size: clamp(32px, 5vw, 58px); line-height: 1.1; letter-spacing: -.04em; }
.intro-banner h1 em { color: var(--accent); font-style: normal; }
.intro-banner > p:last-child { max-width: 500px; margin-top: 18px; color: var(--muted); font-size: 14px; }
.card { border: 1px solid var(--line); border-radius: 7px; padding: 24px; background: var(--card); box-shadow: 0 14px 35px rgba(27, 65, 48, .06); }
.profile-card { display: flex; align-items: center; gap: 22px; }
.avatar-ring { width: 88px; height: 88px; flex: 0 0 auto; padding: 4px; border-radius: 50% 50% 50% 5px; background: var(--accent); }
.avatar { width: 100%; height: 100%; border-radius: inherit; object-fit: cover; background: var(--card); }
.profile-info { flex: 1; min-width: 0; }
.profile-info h1 { margin-bottom: 3px; font-size: 25px; }
.info-line, .intro, .detail-text { color: var(--muted); font-size: 13px; line-height: 1.7; }
.info-line span { margin-right: 15px; }
.intro { max-width: 700px; }
.links { display: flex; gap: 7px; margin-top: 10px; }
.links a { color: var(--accent); font-size: 12px; text-decoration: none; }
.links a:hover { text-decoration: underline; }
.profile-actions { display: flex; flex-direction: column; gap: 7px; }
.mini { color: white; background: var(--accent); }
.mini.ghost { color: var(--accent-deep); background: transparent; }
.edit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.edit-grid textarea, .edit-grid .btns { grid-column: span 2; }
input, textarea { width: 100%; border: 1px solid var(--line); border-radius: 4px; padding: 8px 10px; color: var(--ink); background: var(--paper); outline: none; }
input:focus, textarea:focus { border-color: var(--accent); }
.btns { display: flex; gap: 7px; }
.detail-card { border-left: 4px solid var(--warm); }
.section-title { margin-bottom: 12px; font-size: 18px; }
.skills-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.skills-header .section-title { margin: 0; }
.count { color: var(--muted); font-size: 12px; font-weight: normal; }
.search-field { display: flex; align-items: center; gap: 7px; width: 250px; border-bottom: 1px solid var(--line); color: var(--muted); }
.search-field input { border: 0; background: transparent; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.skill-item { display: flex; align-items: center; gap: 9px; padding: 12px; border-bottom: 1px solid var(--line); font-size: 13px; }
.skill-item .name { font-weight: 700; }
.tag { color: var(--muted); font-size: 11px; }
.level { display: flex; align-items: center; gap: 5px; margin-left: auto; color: var(--muted); font-size: 11px; }
.dot { width: 7px; height: 7px; border-radius: 50%; }
.empty { padding: 24px; color: var(--muted); text-align: center; }
.projects-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.projects-header .section-title { margin: 0; }
.project-index { color: var(--accent); font-size: 12px; text-decoration: none; }
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.project-card { display: flex; min-height: 220px; flex-direction: column; padding: 16px; border: 1px solid var(--line); border-radius: 5px; background: color-mix(in srgb, var(--paper) 55%, var(--card)); }
.project-card-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 30px; }
.project-type, .project-status, .project-tags span { color: var(--muted); font-size: 11px; }
.project-status { padding: 4px 7px; border-radius: 3px; background: var(--line); }
.project-status.is-done { color: var(--accent-deep); background: #dcefe5; }
.project-status.is-active { color: #94611f; background: #f7e9cc; }
.project-status.is-planned { color: #586b8c; background: #e1e8f3; }
.project-card h3 { margin-bottom: 8px; font-size: 17px; }
.project-card p { color: var(--muted); font-size: 12px; line-height: 1.7; }
.project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding: 16px 0 12px; }
.project-tags span { padding: 3px 6px; border: 1px solid var(--line); border-radius: 3px; }
.project-card > a { color: var(--accent); font-size: 12px; text-decoration: none; }
.site-footer { display: flex; justify-content: space-between; gap: 20px; padding: 22px 0 30px; border-top: 1px solid var(--line); color: var(--muted); font-size: 12px; }
.site-footer strong { display: block; margin-bottom: 5px; color: var(--ink); font-size: 13px; }
.site-footer a { color: var(--accent); }
.site-nav a.active { color: var(--accent-deep); }
.site-nav a.active::after { display: block; height: 2px; margin-top: 4px; background: var(--warm); content: ''; }
.profile-actions { align-items: flex-end; }
.manage-link { display: inline-flex; align-items: center; color: var(--accent-deep); text-decoration: none; }
.projects-page { min-height: calc(100vh - 170px); }
.detail-page { min-height: calc(100vh - 170px); }
.detail-back { display: inline-block; color: var(--accent); font-size: 13px; text-decoration: none; }
.detail-hero { padding: 42px 0 30px; border-bottom: 1px solid var(--line); }
.detail-hero h1, .not-found h1 { margin: 0; font-size: clamp(30px, 5vw, 48px); font-weight: 500; }
.detail-hero > p:not(.eyebrow) { max-width: 620px; margin-top: 14px; color: var(--muted); font-size: 14px; line-height: 1.8; }
.detail-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 25px 0; border-bottom: 1px solid var(--line); }
.detail-facts div { display: flex; flex-direction: column; gap: 8px; }
.detail-facts span { color: var(--muted); font-size: 11px; }
.detail-facts strong { font-size: 14px; font-weight: 500; }
.detail-note { max-width: 650px; padding: 26px 0; }
.detail-note > p:last-child { color: var(--muted); font-size: 13px; line-height: 1.8; }
.not-found { min-height: 65vh; }
.login-page { position: relative; display: grid; min-height: 100vh; place-items: center; padding: 64px 20px; background: radial-gradient(circle at 80% 0%, #e5f0e7 0, transparent 32rem), var(--paper); }
.login-page > .detail-back { position: absolute; top: 26px; left: max(20px, calc((100% - 1080px) / 2)); }
.login-panel { width: min(430px, 100%); padding: 30px; border: 1px solid var(--line); background: var(--card); box-shadow: 0 14px 35px rgba(27, 65, 48, .06); }
.login-panel h1, .admin-heading h1 { margin: 0; font-size: 30px; font-weight: 500; }
.login-copy { margin: 10px 0 22px; color: var(--muted); font-size: 13px; }
.admin-form, .admin-form label { display: flex; flex-direction: column; gap: 8px; }
.admin-form { gap: 14px; }
.admin-form label, .editor-grid label { color: var(--muted); font-size: 12px; }
.admin-form input, .editor-grid input, .editor-grid textarea, .editor-grid select { width: 100%; border: 1px solid var(--line); border-radius: 4px; padding: 10px; color: var(--ink); background: var(--paper); }
.admin-form .admin-button { width: 100%; }
.admin-error { margin: 0; color: #a74434; font-size: 12px; }
.demo-hint { padding-top: 13px; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; }
.admin-shell { min-height: 100vh; background: var(--paper); }
.admin-topbar { display: flex; min-height: 72px; align-items: center; justify-content: space-between; padding: 12px max(24px, calc((100% - 1080px) / 2)); border-bottom: 1px solid var(--line); background: var(--card); }
.admin-topbar .brand small { display: block; color: var(--muted); font-size: 10px; font-weight: 400; }
.admin-actions { display: flex; align-items: center; gap: 15px; }
.admin-actions > a { color: var(--accent); font-size: 12px; text-decoration: none; }
.admin-button { display: inline-flex; min-height: 38px; align-items: center; justify-content: center; padding: 0 15px; border: 1px solid var(--accent); border-radius: 4px; background: var(--accent); color: #fff; font-size: 12px; text-decoration: none; cursor: pointer; }
.admin-button:hover { background: var(--accent-deep); }
.admin-button.quiet { background: transparent; color: var(--accent-deep); }
.admin-frame { display: grid; width: min(1080px, calc(100% - 40px)); grid-template-columns: 190px minmax(0, 1fr); gap: 34px; margin: 36px auto; }
.admin-sidebar { display: flex; flex-direction: column; gap: 6px; }
.admin-sidebar .eyebrow { margin: 0 0 10px; }
.admin-sidebar > a { display: flex; justify-content: space-between; padding: 10px; color: var(--muted); font-size: 13px; text-decoration: none; }
.admin-sidebar > a.router-link-active { border-left: 3px solid var(--warm); background: var(--card); color: var(--accent-deep); }
.admin-sidebar > a span { font-size: 10px; }
.admin-main { min-width: 0; }
.admin-heading { margin-bottom: 20px; }
.admin-heading > p:last-child { color: var(--muted); font-size: 13px; }
.editor-panel { margin-bottom: 24px; padding: 22px; border: 1px solid var(--line); background: var(--card); }
.editor-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.editor-grid label { display: flex; flex-direction: column; gap: 7px; }
.editor-grid .wide-field { grid-column: 1 / -1; }
.editor-grid textarea { resize: vertical; line-height: 1.6; }
.save-message { min-height: 18px; margin: 14px 0; color: var(--accent-deep); font-size: 12px; }
.form-actions, .row-actions { display: flex; align-items: center; gap: 9px; }
.managed-projects { margin-bottom: 24px; border-top: 1px solid var(--line); }
.managed-project { display: flex; justify-content: space-between; gap: 18px; padding: 15px 8px; border-bottom: 1px solid var(--line); }
.managed-project .eyebrow { margin-bottom: 5px; }
.managed-project h2, .editor-title h2 { margin: 0 0 5px; font-size: 16px; font-weight: 500; }
.managed-project p:not(.eyebrow) { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.6; }
.text-action { border: 0; background: transparent; color: var(--accent); font-size: 12px; cursor: pointer; }
.text-action.danger { color: #a74434; }
.editor-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.empty-state { padding: 24px; color: var(--muted); text-align: center; }
.article-list { border-top: 1px solid var(--line); }
.article-row { display: grid; grid-template-columns: 125px minmax(0, 1fr); gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--line); }
.article-date { color: var(--muted); font-size: 12px; }
.article-copy h2 { margin: 8px 0; font-size: 18px; }
.article-copy p { color: var(--muted); font-size: 13px; line-height: 1.7; }
.article-content { margin-top: 12px; }
.article-editor-list { margin-bottom: 24px; border-top: 1px solid var(--line); }
.article-editor-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; padding: 15px 8px; border-bottom: 1px solid var(--line); }
.article-editor-row h2 { margin: 0 0 5px; font-size: 16px; font-weight: 500; }
.article-editor-row p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.6; }
.article-list { display: flex; flex-direction: column; gap: 12px; border-top: 0; }
.article-card.el-card, .timeline-card.el-card { border-color: var(--line); border-radius: 6px; background: var(--card); }
.article-card .el-card__body { padding: 20px; }
.article-row { border: 0; padding: 0; }
.article-copy .el-tag { margin-bottom: 2px; }
.timeline-row { width: 100%; }
.timeline-card .section-title { margin-bottom: 22px; }
.timeline-card h3 { margin: 0 0 6px; font-size: 14px; }
.timeline-card .el-timeline-item__content p { color: var(--muted); font-size: 12px; line-height: 1.7; }
.timeline-card .el-timeline-item__timestamp { color: var(--muted); font-size: 11px; }
.admin-layout-frame { display: flex; align-items: flex-start; }
.admin-layout-frame .admin-sidebar { display: block; flex: 0 0 190px; height: auto; overflow: visible; }
.admin-menu { border-right: 0; background: transparent; }
.admin-menu .el-menu-item { height: 42px; padding: 0 10px !important; color: var(--muted); font-size: 13px; }
.admin-menu .el-menu-item span { margin-left: auto; color: var(--muted); font-size: 10px; }
.admin-menu .el-menu-item.is-active { border-left: 3px solid var(--warm); background: var(--card); color: var(--accent-deep); }
.admin-layout-frame .admin-main { flex: 1; padding: 0; overflow: visible; }
.table-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 14px; color: var(--muted); font-size: 12px; }
.content-table { --el-table-border-color: var(--line); --el-table-header-bg-color: #eaf1eb; --el-table-row-hover-bg-color: #f1f6f1; --el-table-bg-color: var(--card); --el-table-tr-bg-color: var(--card); width: 100%; }
.content-table .el-tag + .el-tag { margin-left: 5px; }
.admin-alert { margin-top: 14px; }
.element-form .el-select, .element-form .el-date-editor { width: 100%; }
.element-form .el-form-item { margin-bottom: 16px; }
.el-dialog { border-radius: 6px; background: var(--card); }
.el-dialog__title, .el-form-item__label { color: var(--ink); }
.el-dialog__body { padding-top: 14px; }
@media (min-width: 681px) and (max-width: 900px) {
  .site-header { flex-wrap: wrap; gap: 10px; padding: 12px 0; }
  .site-nav { order: 3; width: 100%; flex-wrap: wrap; gap: 7px 20px; }
  .theme-toggle { margin-left: auto; }
}
@media (max-width: 680px) {
  .page-shell { width: min(100% - 28px, 560px); }
  .site-header { flex-wrap: wrap; gap: 10px; padding: 12px 0; }
  .site-nav { display: flex; order: 3; width: 100%; flex-wrap: wrap; gap: 7px 15px; }
  .theme-toggle { margin-left: auto; }
  .page-content { padding-top: 30px; }
  .profile-card { align-items: flex-start; flex-wrap: wrap; }
  .profile-info { width: calc(100% - 110px); }
  .profile-actions { width: 100%; flex-direction: row; }
  .skills-header { align-items: stretch; flex-direction: column; }
  .search-field { width: 100%; }
  .skills-grid { grid-template-columns: 1fr; }
  .projects-header { align-items: flex-start; flex-direction: column; gap: 8px; }
  .projects-grid { grid-template-columns: 1fr; }
  .site-footer { align-items: flex-start; flex-direction: column; }
  .admin-frame { grid-template-columns: 1fr; gap: 20px; margin-block: 22px; }
  .admin-layout-frame { flex-direction: column; gap: 20px; }
  .admin-layout-frame .admin-sidebar { width: 100% !important; flex-basis: auto; }
  .admin-menu { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .admin-menu .el-menu-item { justify-content: center; padding: 0 6px !important; font-size: 12px; }
  .admin-menu .el-menu-item span { display: none; }
  .admin-layout-frame .admin-main { width: 100%; }
  .admin-sidebar { display: grid; grid-template-columns: repeat(2, 1fr); }
  .admin-sidebar .eyebrow { grid-column: 1 / -1; }
  .detail-facts { grid-template-columns: 1fr; gap: 14px; }
  .editor-grid { grid-template-columns: 1fr; }
  .editor-grid .wide-field { grid-column: auto; }
  .managed-project { align-items: flex-start; flex-direction: column; }
  .article-row { grid-template-columns: 1fr; gap: 8px; }
  .article-editor-row { align-items: flex-start; flex-direction: column; }
  .content-table { font-size: 12px; }
  .content-table .el-table__cell { padding: 7px 0; }
  .row-actions { align-self: flex-end; }
}
</style>
