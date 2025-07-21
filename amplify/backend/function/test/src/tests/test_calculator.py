import json
import unittest
import sys
import os

# Add parent directory to path to import index.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import index

class TestCalculator(unittest.TestCase):
    """Test cases for calculator Lambda function"""
    
    def test_calculate_add(self):
        """Test addition operation"""
        result = index.calculate('add', 5, 3)
        self.assertEqual(result, 8)
        
        # Test with string inputs (should convert to float)
        result = index.calculate('add', '5.5', '3.2')
        self.assertAlmostEqual(result, 8.7)
    
    def test_calculate_subtract(self):
        """Test subtraction operation"""
        result = index.calculate('subtract', 5, 3)
        self.assertEqual(result, 2)
        
        # Test negative result
        result = index.calculate('subtract', 3, 5)
        self.assertEqual(result, -2)
    
    def test_calculate_multiply(self):
        """Test multiplication operation"""
        result = index.calculate('multiply', 5, 3)
        self.assertEqual(result, 15)
        
        # Test with decimals
        result = index.calculate('multiply', 2.5, 2)
        self.assertEqual(result, 5)
    
    def test_calculate_divide(self):
        """Test division operation"""
        result = index.calculate('divide', 6, 3)
        self.assertEqual(result, 2)
        
        # Test with decimal result
        result = index.calculate('divide', 5, 2)
        self.assertEqual(result, 2.5)
    
    def test_division_by_zero(self):
        """Test division by zero raises ValueError"""
        with self.assertRaises(ValueError):
            index.calculate('divide', 5, 0)
    
    def test_invalid_operation(self):
        """Test invalid operation raises ValueError"""
        with self.assertRaises(ValueError):
            index.calculate('power', 5, 2)
    
    def test_invalid_operands(self):
        """Test invalid operands raise ValueError"""
        with self.assertRaises(ValueError):
            index.calculate('add', 'abc', 2)
    
    def test_handler_direct_invocation(self):
        """Test direct invocation of handler"""
        event = {
            'operation': 'add',
            'a': 5,
            'b': 3
        }
        response = index.handler(event, {})
        
        self.assertEqual(response['statusCode'], 200)
        body = json.loads(response['body'])
        self.assertEqual(body['result'], 8)
    
    def test_handler_api_gateway_body(self):
        """Test handler with API Gateway body format"""
        event = {
            'body': json.dumps({
                'operation': 'multiply',
                'a': 4,
                'b': 5
            })
        }
        response = index.handler(event, {})
        
        self.assertEqual(response['statusCode'], 200)
        body = json.loads(response['body'])
        self.assertEqual(body['result'], 20)
    
    def test_handler_query_parameters(self):
        """Test handler with query string parameters"""
        event = {
            'queryStringParameters': {
                'operation': 'subtract',
                'a': '10',
                'b': '7'
            }
        }
        response = index.handler(event, {})
        
        self.assertEqual(response['statusCode'], 200)
        body = json.loads(response['body'])
        self.assertEqual(body['result'], 3)
    
    def test_handler_missing_parameters(self):
        """Test handler with missing parameters"""
        event = {
            'operation': 'add',
            'a': 5
            # Missing 'b'
        }
        response = index.handler(event, {})
        
        self.assertEqual(response['statusCode'], 400)
        body = json.loads(response['body'])
        self.assertIn('error', body)
    
    def test_handler_invalid_operation(self):
        """Test handler with invalid operation"""
        event = {
            'operation': 'power',
            'a': 5,
            'b': 2
        }
        response = index.handler(event, {})
        
        self.assertEqual(response['statusCode'], 400)
        body = json.loads(response['body'])
        self.assertIn('error', body)

if __name__ == '__main__':
    unittest.main()
