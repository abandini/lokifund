# Fund Management Tool API Reference

## Overview

The Fund Management Tool API provides programmatic access to all features of the platform, including portfolio management, investor relations, compliance tracking, document management, analytics, and advanced AI trading strategies. This reference documents all available endpoints, request/response formats, authentication methods, and usage examples.

## Base URL

All API requests should be made to the following base URL:

```
https://api.fundmanagementtool.com/v1
```

## Authentication

### API Keys

Authentication is performed using API keys. Each request must include an `Authorization` header with a valid API key:

```
Authorization: Bearer YOUR_API_KEY
```

To obtain an API key, navigate to the Settings page in the Fund Management Tool and select the "API Access" tab.

### Rate Limiting

API requests are rate-limited to 100 requests per minute per API key. If you exceed this limit, you will receive a `429 Too Many Requests` response.

## Common Response Codes

| Code | Description |
|------|-------------|
| 200  | Success     |
| 400  | Bad Request - Invalid parameters |
| 401  | Unauthorized - Invalid or missing API key |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource does not exist |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |

## Endpoints

### Fund Management

#### GET /funds

Retrieves a list of all funds managed by the authenticated user.

**Parameters:**
- `status` (optional): Filter by fund status (active, pending, closed)
- `limit` (optional): Maximum number of funds to return (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "funds": [
    {
      "id": "fund_123abc",
      "name": "Global Opportunities Fund",
      "status": "active",
      "aum": 25000000,
      "currency": "USD",
      "inception_date": "2023-01-15",
      "strategy": "Long/Short Equity",
      "manager_id": "user_456def"
    },
    ...
  ],
  "total": 5,
  "limit": 20,
  "offset": 0
}
```

#### GET /funds/{fund_id}

Retrieves detailed information about a specific fund.

**Response:**
```json
{
  "id": "fund_123abc",
  "name": "Global Opportunities Fund",
  "status": "active",
  "aum": 25000000,
  "currency": "USD",
  "inception_date": "2023-01-15",
  "strategy": "Long/Short Equity",
  "manager_id": "user_456def",
  "description": "A global long/short equity fund focused on technology and healthcare sectors.",
  "performance": {
    "ytd": 0.0865,
    "1y": 0.1245,
    "3y": 0.3567,
    "5y": 0.5678,
    "inception": 0.6789
  },
  "fees": {
    "management": 0.02,
    "performance": 0.20,
    "hurdle_rate": 0.08,
    "high_water_mark": true
  },
  "investor_count": 45,
  "portfolio_summary": {
    "long_exposure": 0.75,
    "short_exposure": 0.25,
    "net_exposure": 0.50,
    "gross_exposure": 1.00
  }
}
```

#### POST /funds

Creates a new fund.

**Request:**
```json
{
  "name": "Emerging Markets Fund",
  "currency": "USD",
  "strategy": "Long-Only Equity",
  "description": "A fund focused on emerging market opportunities."
}
```

**Response:**
```json
{
  "id": "fund_789ghi",
  "name": "Emerging Markets Fund",
  "status": "pending",
  "currency": "USD",
  "strategy": "Long-Only Equity",
  "description": "A fund focused on emerging market opportunities.",
  "manager_id": "user_456def",
  "creation_date": "2025-05-01"
}
```

### Investor Management

#### GET /investors

Retrieves a list of all investors across all funds.

**Parameters:**
- `fund_id` (optional): Filter by specific fund
- `status` (optional): Filter by investor status (active, pending, former)
- `limit` (optional): Maximum number of investors to return (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "investors": [
    {
      "id": "inv_123abc",
      "name": "John Smith",
      "type": "individual",
      "status": "active",
      "funds": ["fund_123abc", "fund_456def"],
      "total_investment": 1000000,
      "currency": "USD",
      "onboarding_date": "2023-02-15"
    },
    ...
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

#### POST /investors

Creates a new investor record.

**Request:**
```json
{
  "name": "Jane Doe",
  "type": "individual",
  "email": "jane.doe@example.com",
  "phone": "+1-555-123-4567",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "accreditation": {
    "status": "accredited",
    "verification_date": "2025-04-15",
    "verification_method": "income"
  }
}
```

**Response:**
```json
{
  "id": "inv_789ghi",
  "name": "Jane Doe",
  "type": "individual",
  "status": "pending",
  "email": "jane.doe@example.com",
  "phone": "+1-555-123-4567",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "accreditation": {
    "status": "accredited",
    "verification_date": "2025-04-15",
    "verification_method": "income"
  },
  "creation_date": "2025-05-01"
}
```

### Portfolio Management

#### GET /funds/{fund_id}/portfolio

Retrieves the current portfolio holdings for a specific fund.

**Parameters:**
- `as_of_date` (optional): Historical date for portfolio snapshot (default: latest)
- `include_cash` (optional): Include cash positions (default: true)

**Response:**
```json
{
  "fund_id": "fund_123abc",
  "as_of_date": "2025-05-01",
  "holdings": [
    {
      "security_id": "sec_123abc",
      "ticker": "AAPL",
      "name": "Apple Inc.",
      "asset_class": "equity",
      "quantity": 1000,
      "market_value": 175000,
      "currency": "USD",
      "weight": 0.07,
      "cost_basis": 150000,
      "unrealized_pl": 25000,
      "unrealized_pl_pct": 0.1667
    },
    ...
  ],
  "summary": {
    "total_market_value": 25000000,
    "cash": 2500000,
    "cash_pct": 0.10,
    "long_exposure": 0.75,
    "short_exposure": 0.25,
    "net_exposure": 0.50,
    "gross_exposure": 1.00
  }
}
```

#### POST /funds/{fund_id}/trades

Executes trades for a specific fund.

**Request:**
```json
{
  "trades": [
    {
      "ticker": "AAPL",
      "side": "buy",
      "quantity": 500,
      "order_type": "market"
    },
    {
      "ticker": "MSFT",
      "side": "sell",
      "quantity": 300,
      "order_type": "limit",
      "limit_price": 350.00
    }
  ],
  "strategy_id": "algo_123abc",
  "notes": "Rebalancing technology exposure"
}
```

**Response:**
```json
{
  "trade_batch_id": "batch_123abc",
  "fund_id": "fund_123abc",
  "status": "submitted",
  "trades": [
    {
      "id": "trade_123abc",
      "ticker": "AAPL",
      "side": "buy",
      "quantity": 500,
      "order_type": "market",
      "status": "pending"
    },
    {
      "id": "trade_456def",
      "ticker": "MSFT",
      "side": "sell",
      "quantity": 300,
      "order_type": "limit",
      "limit_price": 350.00,
      "status": "pending"
    }
  ],
  "submission_time": "2025-05-01T14:30:00Z",
  "strategy_id": "algo_123abc"
}
```

### AI Trading Strategies

#### GET /ai/strategies

Retrieves a list of all available AI trading strategies.

**Parameters:**
- `status` (optional): Filter by strategy status (active, development, archived)
- `type` (optional): Filter by strategy type (drl, transformer, sentiment, multiagent, quantum, explainable, adaptive, hierarchical)

**Response:**
```json
{
  "strategies": [
    {
      "id": "algo_123abc",
      "name": "DRL Portfolio Optimizer",
      "type": "drl",
      "status": "active",
      "description": "Deep reinforcement learning model for portfolio optimization",
      "created_at": "2025-01-15T10:00:00Z",
      "last_trained": "2025-04-30T08:15:00Z",
      "performance_metrics": {
        "sharpe_ratio": 1.85,
        "sortino_ratio": 2.43,
        "max_drawdown": -0.12,
        "annualized_return": 0.18
      }
    },
    ...
  ]
}
```

#### GET /ai/strategies/{strategy_id}

Retrieves detailed information about a specific AI trading strategy.

**Response:**
```json
{
  "id": "algo_123abc",
  "name": "DRL Portfolio Optimizer",
  "type": "drl",
  "status": "active",
  "description": "Deep reinforcement learning model for portfolio optimization",
  "created_at": "2025-01-15T10:00:00Z",
  "last_trained": "2025-04-30T08:15:00Z",
  "performance_metrics": {
    "sharpe_ratio": 1.85,
    "sortino_ratio": 2.43,
    "max_drawdown": -0.12,
    "annualized_return": 0.18
  },
  "configuration": {
    "model_type": "a2c",
    "risk_aversion": 0.5,
    "training_episodes": 10000,
    "features": ["price", "volume", "volatility", "momentum", "sentiment"],
    "lookback_window": 30,
    "rebalancing_frequency": "daily"
  },
  "asset_universe": ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "NVDA", "JPM", "V", "PG"],
  "training_history": [
    {
      "episode": 1000,
      "reward": 0.15,
      "sharpe_ratio": 1.25
    },
    {
      "episode": 2000,
      "reward": 0.32,
      "sharpe_ratio": 1.45
    },
    ...
  ]
}
```

#### POST /ai/strategies/{strategy_id}/train

Initiates training for a specific AI trading strategy.

**Request:**
```json
{
  "configuration": {
    "model_type": "a2c",
    "risk_aversion": 0.5,
    "training_episodes": 10000,
    "features": ["price", "volume", "volatility", "momentum", "sentiment"],
    "lookback_window": 30
  },
  "asset_universe": ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "NVDA", "JPM", "V", "PG"],
  "training_start_date": "2020-01-01",
  "training_end_date": "2024-12-31"
}
```

**Response:**
```json
{
  "training_job_id": "job_123abc",
  "strategy_id": "algo_123abc",
  "status": "queued",
  "estimated_completion_time": "2025-05-01T16:30:00Z"
}
```

#### GET /ai/strategies/{strategy_id}/predictions

Retrieves predictions from a specific AI trading strategy.

**Parameters:**
- `horizon` (optional): Prediction horizon in days (default: 1)
- `confidence_interval` (optional): Include confidence intervals (default: true)

**Response:**
```json
{
  "strategy_id": "algo_123abc",
  "prediction_date": "2025-05-01",
  "horizon": 1,
  "predictions": [
    {
      "ticker": "AAPL",
      "predicted_return": 0.0125,
      "confidence_interval": [0.0075, 0.0175],
      "prediction_factors": {
        "technical": 0.45,
        "fundamental": 0.30,
        "sentiment": 0.25
      }
    },
    ...
  ],
  "portfolio_recommendation": {
    "AAPL": 0.15,
    "MSFT": 0.12,
    "GOOGL": 0.10,
    "AMZN": 0.08,
    "META": 0.07,
    "TSLA": 0.06,
    "NVDA": 0.15,
    "JPM": 0.10,
    "V": 0.09,
    "PG": 0.08
  }
}
```

#### POST /ai/sentiment/analyze

Analyzes sentiment for specified assets or text content.

**Request:**
```json
{
  "assets": ["AAPL", "MSFT", "GOOGL"],
  "sources": ["news", "social_media", "earnings_calls"],
  "time_range": {
    "start_date": "2025-04-01",
    "end_date": "2025-05-01"
  },
  "model": "llm-finance-large"
}
```

**Response:**
```json
{
  "analysis_id": "analysis_123abc",
  "assets": ["AAPL", "MSFT", "GOOGL"],
  "analysis_date": "2025-05-01",
  "results": [
    {
      "asset": "AAPL",
      "overall_sentiment": 0.75,
      "sentiment_by_source": {
        "news": 0.82,
        "social_media": 0.68,
        "earnings_calls": 0.76
      },
      "key_topics": [
        {
          "topic": "iPhone sales",
          "sentiment": 0.85,
          "relevance": 0.90
        },
        {
          "topic": "AI integration",
          "sentiment": 0.78,
          "relevance": 0.75
        },
        {
          "topic": "App Store regulation",
          "sentiment": 0.45,
          "relevance": 0.60
        }
      ],
      "recent_events": [
        {
          "title": "Apple announces new AI features for iPhone",
          "source": "TechCrunch",
          "date": "2025-04-25",
          "sentiment": 0.88
        }
      ]
    },
    ...
  ]
}
```

### Analytics

#### GET /analytics/performance

Retrieves performance analytics for a specific fund.

**Parameters:**
- `fund_id`: ID of the fund to analyze
- `period` (optional): Time period for analysis (1d, 1w, 1m, 3m, 6m, 1y, 3y, 5y, ytd, all)
- `frequency` (optional): Data frequency (daily, weekly, monthly)
- `benchmark` (optional): Benchmark ticker for comparison (e.g., SPY, QQQ)

**Response:**
```json
{
  "fund_id": "fund_123abc",
  "period": "1y",
  "frequency": "daily",
  "benchmark": "SPY",
  "start_date": "2024-05-01",
  "end_date": "2025-05-01",
  "performance_metrics": {
    "return": 0.1845,
    "benchmark_return": 0.1245,
    "alpha": 0.06,
    "beta": 0.85,
    "sharpe_ratio": 1.85,
    "sortino_ratio": 2.43,
    "max_drawdown": -0.12,
    "volatility": 0.15,
    "information_ratio": 0.75,
    "tracking_error": 0.08,
    "upside_capture": 1.10,
    "downside_capture": 0.85
  },
  "time_series": [
    {
      "date": "2024-05-01",
      "fund_value": 100.00,
      "benchmark_value": 100.00
    },
    {
      "date": "2024-05-02",
      "fund_value": 100.50,
      "benchmark_value": 100.30
    },
    ...
  ]
}
```

#### GET /analytics/attribution

Retrieves performance attribution analysis for a specific fund.

**Parameters:**
- `fund_id`: ID of the fund to analyze
- `period` (optional): Time period for analysis (1d, 1w, 1m, 3m, 6m, 1y, 3y, 5y, ytd, all)
- `level` (optional): Attribution level (asset, sector, country, factor)

**Response:**
```json
{
  "fund_id": "fund_123abc",
  "period": "1y",
  "level": "sector",
  "start_date": "2024-05-01",
  "end_date": "2025-05-01",
  "total_return": 0.1845,
  "attribution": [
    {
      "sector": "Technology",
      "allocation_effect": 0.0325,
      "selection_effect": 0.0420,
      "interaction_effect": 0.0075,
      "total_effect": 0.0820,
      "weight": 0.35,
      "return": 0.2245
    },
    {
      "sector": "Healthcare",
      "allocation_effect": 0.0125,
      "selection_effect": 0.0210,
      "interaction_effect": 0.0040,
      "total_effect": 0.0375,
      "weight": 0.20,
      "return": 0.1845
    },
    ...
  ]
}
```

### Documents

#### GET /documents

Retrieves a list of all documents.

**Parameters:**
- `fund_id` (optional): Filter by specific fund
- `investor_id` (optional): Filter by specific investor
- `type` (optional): Filter by document type (prospectus, financial_statement, tax_document, regulatory_filing, investor_communication)
- `limit` (optional): Maximum number of documents to return (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "documents": [
    {
      "id": "doc_123abc",
      "name": "Global Opportunities Fund - Prospectus",
      "type": "prospectus",
      "fund_id": "fund_123abc",
      "created_at": "2023-01-10T10:00:00Z",
      "updated_at": "2023-01-10T10:00:00Z",
      "size": 2500000,
      "format": "pdf",
      "url": "https://api.fundmanagementtool.com/v1/documents/doc_123abc/download"
    },
    ...
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

#### POST /documents

Uploads a new document.

**Request:**
```
Content-Type: multipart/form-data

file: [binary data]
name: Q1 2025 Investor Letter
type: investor_communication
fund_id: fund_123abc
```

**Response:**
```json
{
  "id": "doc_789ghi",
  "name": "Q1 2025 Investor Letter",
  "type": "investor_communication",
  "fund_id": "fund_123abc",
  "created_at": "2025-05-01T14:30:00Z",
  "updated_at": "2025-05-01T14:30:00Z",
  "size": 1500000,
  "format": "pdf",
  "url": "https://api.fundmanagementtool.com/v1/documents/doc_789ghi/download"
}
```

### Compliance

#### GET /compliance/tasks

Retrieves a list of compliance tasks.

**Parameters:**
- `fund_id` (optional): Filter by specific fund
- `status` (optional): Filter by task status (completed, upcoming, urgent, overdue)
- `limit` (optional): Maximum number of tasks to return (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "tasks": [
    {
      "id": "task_123abc",
      "title": "Form ADV Annual Update",
      "description": "Submit annual update to Form ADV with the SEC",
      "fund_id": "fund_123abc",
      "status": "upcoming",
      "due_date": "2025-06-15",
      "category": "regulatory_filing",
      "assigned_to": "user_456def",
      "priority": "high"
    },
    ...
  ],
  "total": 15,
  "limit": 20,
  "offset": 0
}
```

#### POST /compliance/tasks/{task_id}/complete

Marks a compliance task as completed.

**Request:**
```json
{
  "completion_notes": "Submitted Form ADV annual update to the SEC on May 1, 2025.",
  "documents": ["doc_123abc"]
}
```

**Response:**
```json
{
  "id": "task_123abc",
  "title": "Form ADV Annual Update",
  "status": "completed",
  "completion_date": "2025-05-01T14:30:00Z",
  "completion_notes": "Submitted Form ADV annual update to the SEC on May 1, 2025.",
  "completed_by": "user_456def",
  "documents": ["doc_123abc"]
}
```

## Webhooks

The Fund Management Tool API supports webhooks for real-time notifications of events. To set up a webhook, navigate to the Settings page in the Fund Management Tool and select the "Webhooks" tab.

### Event Types

- `fund.created` - A new fund has been created
- `fund.updated` - Fund details have been updated
- `investor.created` - A new investor has been added
- `investor.updated` - Investor details have been updated
- `trade.executed` - A trade has been executed
- `document.uploaded` - A new document has been uploaded
- `compliance.task_due` - A compliance task is due soon
- `ai.training_completed` - AI model training has completed
- `ai.prediction_generated` - New AI predictions are available

### Webhook Payload Example

```json
{
  "event_type": "trade.executed",
  "event_id": "evt_123abc",
  "timestamp": "2025-05-01T14:30:00Z",
  "data": {
    "trade_id": "trade_123abc",
    "fund_id": "fund_123abc",
    "ticker": "AAPL",
    "side": "buy",
    "quantity": 500,
    "price": 175.25,
    "execution_time": "2025-05-01T14:30:00Z"
  }
}
```

## Error Handling

All error responses follow a standard format:

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "The parameter 'limit' must be a positive integer.",
    "details": {
      "parameter": "limit",
      "value": "-10"
    }
  }
}
```

## SDKs and Client Libraries

The Fund Management Tool provides official client libraries for the following languages:

- JavaScript/TypeScript: [npm package](https://www.npmjs.com/package/fundmanagementtool-api)
- Python: [PyPI package](https://pypi.org/project/fundmanagementtool-api/)
- Java: [Maven package](https://mvnrepository.com/artifact/com.fundmanagementtool/api-client)
- C#: [NuGet package](https://www.nuget.org/packages/FundManagementTool.ApiClient)

## Changelog

### v1.5.0 (2025-05-01)
- Added Advanced AI Trading Strategies endpoints
- Added sentiment analysis capabilities
- Improved portfolio optimization algorithms

### v1.4.0 (2025-03-15)
- Added performance attribution analysis
- Enhanced document management features
- Improved compliance tracking

### v1.3.0 (2025-02-01)
- Added support for multi-currency portfolios
- Enhanced investor management features
- Added support for custom benchmarks

### v1.2.0 (2025-01-15)
- Added webhook support for real-time notifications
- Enhanced analytics capabilities
- Improved error handling and documentation

### v1.1.0 (2024-12-01)
- Added support for document management
- Enhanced compliance tracking features
- Improved performance and reliability

### v1.0.0 (2024-11-01)
- Initial release of the Fund Management Tool API
