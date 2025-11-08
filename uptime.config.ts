// 这是一个简化的快速启动示例配置文件
// 一些不常用的功能在这里被省略或注释掉
// 若需要完整功能示例，请参考 `uptime.config.full.ts`

// 不要编辑此行
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // 状态页标题
  title: "keke's Status Page",
  // 状态页顶部显示的链接，可以将 `highlight` 设置为 `true`
  links: [
    { link: 'https://github.com/wwkk2580', label: 'GitHub' }
    //{ link: 'https://blog。lyc8503。net/', label: 'Blog' },
    //{ link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
}

const workerConfig: WorkerConfig = {
  // 在这里定义所有监控器
  monitors: [
    // HTTP 监控器示例
    {
      // `id` 必须唯一，如果 `id` 不变，则会保留历史记录
      id: 'foo_monitor',
      // `name` 用于状态页和回调消息
      name: 'linuxdo',
      // `method` 必须是有效的 HTTP 方法
      method: 'GET',
      // `target` 必须是有效 URL
      target: 'https://linux.do/',
      // [可选] `tooltip` 仅在状态页显示提示信息
      tooltip: '真诚、友善、团结、专业，共建你我引以为荣之社区。',
      // [可选] `statusPageLink` 仅在状态页提供可点击链接
      statusPageLink: 'https://linux.do/',
      // [可选] `expectedCodes` 为可接受的 HTTP 响应码数组，如果未指定，默认为 2xx
      expectedCodes: [200],
      // [可选] 超时时间（毫秒），如果未指定，默认为 10000
      timeout: 10000,
      // [可选] 发送的请求头
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0',
        Authorization: 'Bearer YOUR_TOKEN_HERE',
      },
      // [可选] 发送的请求体（仅在 POST/PUT/PATCH 方法时使用）
      // body: 'Hello, world!',
      // [可选] 如果指定，响应必须包含该关键字才认为服务正常
      // responseKeyword: 'success',
      // [可选] 如果指定，响应中不能包含该关键字才认为服务正常
      // responseForbiddenKeyword: 'bad gateway',
      // [可选] 如果指定，将调用检查代理来检测监控器，主要用于地理位置相关检查
      // 请参考文档 https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup 设置此值
      // 当前支持 `worker://`、`globalping://` 和 `http(s)://` 代理
      // checkProxy: 'worker://weur',
      // [可选] 如果为 true，当指定的代理不可用时，将回退到本地检查
      // checkProxyFallback: true,
    },
    // TCP 监控器示例
    // {
    //   id: 'test_tcp_monitor',
    //   name: 'Example TCP Monitor',
    //   // TCP 监控器的 `method` 应为 `TCP_PING`
    //   method: 'TCP_PING',
    //   // TCP 监控器的 `target` 应为 `host:port`
    //   target: '1.2.3.4:22',
    //   tooltip: '我的生产服务器 SSH',
    //   statusPageLink: 'https://example.com',
    //   timeout: 5000,
    // },
  ],
  // [可选] 通知设置
  notification: {
    // [可选] 通知 webhook 设置，如果未指定，则不会发送通知
    // 更多信息见 Wiki: https://github.com/lyc8503/UptimeFlare/wiki/Setup-notification
    webhook: {
      // [必填] webhook URL（示例：Telegram Bot API）
      url: '',
      // [可选] HTTP 方法，payloadType=param 默认为 'GET'，否则为 'POST'
      // method: 'POST',
      // [可选] 发送的请求头
      // headers: {
      //   foo: 'bar',
      // },
      // [必填] 指定 payload 的编码方式
      // 可选 'param'、'json' 或 'x-www-form-urlencoded'
      // 'param'：将 URL 编码的 payload 附加到 URL 查询参数
      // 'json'：以 JSON 格式 POST payload，Content-Type 为 'application/json'
      // 'x-www-form-urlencoded'：以 URL 编码格式 POST payload，Content-Type 为 'x-www-form-urlencoded'
      payloadType: 'x-www-form-urlencoded',
      // [必填] 要发送的 payload
      // $MSG 会被替换为可读的通知消息
      payload: {
        chat_id: 12345678,
        text: '$MSG',
      },
      // [可选] 调用 webhook 的超时时间，单位毫秒，默认为 5000
      timeout: 10000,
    },
    // [可选] 通知消息使用的时区，默认 "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [可选] 在发送通知前的宽限时间（分钟）
    // 只有当监控器连续 N 次检测失败后才发送通知
    // 如果未指定，将立即发送通知
    gracePeriod: 5,
  },
}

// 你可以在这里定义多个维护任务
// 维护期间，状态页会显示相关警报
// 同时，相关的故障通知会被跳过（如果有）
// 如果不需要此功能，可以留空

const maintenances: MaintenanceConfig[] = []

// const maintenances: MaintenanceConfig[] = [
//   {
//     // [可选] 受此次维护影响的监控器 ID
//     monitors: ['foo_monitor', 'bar_monitor'],
//     // [可选] 如果未指定，默认显示 "Scheduled Maintenance"
//     title: '测试维护',
//     // 维护描述，会显示在状态页
//     body: '这是一个测试维护，服务器软件升级',
//     // 维护开始时间，可使用 UNIX 时间戳或 ISO 8601 格式
//     start: '2020-01-01T00:00:00+08:00',
//     // [可选] 维护结束时间，可使用 UNIX 时间戳或 ISO 8601 格式
//     // 如果未指定，维护将被视为持续进行
//     end: '2050-01-01T00:00:00+08:00',
//     // [可选] 状态页显示的维护警报颜色，默认 "yellow"
//     color: 'blue',
//   },
// ]

// 不要编辑此行
export { maintenances, pageConfig, workerConfig }
