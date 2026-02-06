"""
Database Migration Script for SALIS AUTO Platform
Applies all schema changes to PostgreSQL database
"""

import psycopg2
from psycopg2 import sql
import os
from pathlib import Path

# Database configuration
DB_CONFIG = {
    'dbname': os.getenv('DB_NAME', 'salisauto'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'postgres'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432')
}

def get_connection():
    """Create database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to database: {e}")
        return None

def execute_sql_file(conn, filepath):
    """Execute SQL commands from a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        cursor = conn.cursor()
        cursor.execute(sql_content)
        conn.commit()
        cursor.close()
        print(f"✓ Successfully executed: {filepath}")
        return True
    except psycopg2.Error as e:
        print(f"✗ Error executing {filepath}: {e}")
        conn.rollback()
        return False
    except FileNotFoundError:
        print(f"✗ File not found: {filepath}")
        return False

def main():
    """Main migration function"""
    print("=" * 60)
    print("SALIS AUTO Platform - Database Migration")
    print("=" * 60)
    
    # Get connection
    conn = get_connection()
    if not conn:
        print("Failed to connect to database. Please check your configuration.")
        return False
    
    print(f"\nConnected to database: {DB_CONFIG['dbname']}")
    print("\nExecuting migrations...\n")
    
    # Define migration files in order
    api_dir = Path(__file__).parent
    migration_files = [
        api_dir / 'schema_complete.sql',  # Complete consolidated schema
    ]
    
    # Execute each migration
    success_count = 0
    for filepath in migration_files:
        if filepath.exists():
            if execute_sql_file(conn, filepath):
                success_count += 1
        else:
            print(f"⚠ Skipping missing file: {filepath}")
    
    # Close connection
    conn.close()
    
    print("\n" + "=" * 60)
    print(f"Migration complete: {success_count}/{len(migration_files)} files executed")
    print("=" * 60)
    
    return success_count == len(migration_files)

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
