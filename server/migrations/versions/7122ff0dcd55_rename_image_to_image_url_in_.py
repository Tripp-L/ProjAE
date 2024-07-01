"""Rename image to image_url in Civilization

Revision ID: 7122ff0dcd55
Revises: d6223ea974fe
Create Date: 2024-07-01 12:30:35.853424

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7122ff0dcd55'
down_revision = 'd6223ea974fe'
branch_labels = None
depends_on = None


def upgrade():
   op.alter_column('civilization', 'image', new_column_name='image_url')


def downgrade():
    op.alter_column('civilization', 'image_url', new_column_name='image')
