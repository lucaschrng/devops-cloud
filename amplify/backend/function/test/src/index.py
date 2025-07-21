import json
import decimal
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def calculate(operation, a, b):
    """
    Perform a basic arithmetic calculation
    
    Args:
        operation (str): The operation to perform ('add', 'subtract', 'multiply', 'divide')
        a (float/int): First operand
        b (float/int): Second operand
        
    Returns:
        float/int: Result of the calculation
        
    Raises:
        ValueError: If operation is invalid or division by zero
    """
    try:
        a = float(a)
        b = float(b)
    except (ValueError, TypeError):
        raise ValueError("Operands must be numbers")
    
    if operation == 'add':
        return a + b
    elif operation == 'subtract':
        return a - b
    elif operation == 'multiply':
        return a * b
    elif operation == 'divide':
        if b == 0:
            raise ValueError("Division by zero")
        return a / b
    else:
        raise ValueError(f"Invalid operation: {operation}")

def handler(event, context):
    """
    Lambda function handler for calculator API
    
    Expected JSON input:
    {
        "operation": "add|subtract|multiply|divide",
        "a": number,
        "b": number
    }
    
    Returns:
        dict: API Gateway response with calculation result
    """
    logger.info('Received event: %s', json.dumps(event))
    
    # Check if body exists and parse it
    body = {}
    if 'body' in event:
        try:
            body = json.loads(event['body'])
        except (TypeError, json.JSONDecodeError):
            logger.error("Failed to parse request body")
            return {
                'statusCode': 400,
                'headers': get_cors_headers(),
                'body': json.dumps({'error': 'Invalid request body'})
            }
    elif 'queryStringParameters' in event and event['queryStringParameters']:
        # Support query string parameters as alternative
        body = event['queryStringParameters']
    else:
        # Direct invocation (for testing or direct Lambda calls)
        body = event
    
    # Extract parameters
    operation = body.get('operation')
    a = body.get('a')
    b = body.get('b')
    
    # Validate input
    if not all([operation, a is not None, b is not None]):
        logger.error("Missing required parameters")
        return {
            'statusCode': 400,
            'headers': get_cors_headers(),
            'body': json.dumps({'error': 'Missing required parameters: operation, a, b'})
        }
    
    # Perform calculation
    try:
        result = calculate(operation, a, b)
        
        # Handle Decimal serialization
        if isinstance(result, decimal.Decimal):
            result = float(result)
            
        return {
            'statusCode': 200,
            'headers': get_cors_headers(),
            'body': json.dumps({
                'operation': operation,
                'a': float(a) if not isinstance(a, str) else a,
                'b': float(b) if not isinstance(b, str) else b,
                'result': result
            })
        }
    except ValueError as e:
        logger.error("Calculation error: %s", str(e))
        return {
            'statusCode': 400,
            'headers': get_cors_headers(),
            'body': json.dumps({'error': str(e)})
        }
    except Exception as e:
        logger.error("Unexpected error: %s", str(e))
        return {
            'statusCode': 500,
            'headers': get_cors_headers(),
            'body': json.dumps({'error': 'Internal server error'})
        }

def get_cors_headers():
    """Return CORS headers for API responses"""
    return {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }