"""Rename image to image_url in Civilization

Revision ID: ce33d5fc1992
Revises: 6b5631b89ab5
Create Date: 2024-07-01 12:22:15.388205

"""
from alembic import op
import sqlalchemy as sa


revision = 'ce33d5fc1992'
down_revision = '6b5631b89ab5'
branch_labels = None
depends_on = None

def upgrade():
    op.alter_column('civilization', 'image', new_column_name='image_url')

def downgrade():
    op.alter_column('civilization', 'image_url', new_column_name='image')
